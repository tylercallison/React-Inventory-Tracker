// eslint-disable-next-line no-unused-vars
import "../config"
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { collection, doc, setDoc, getDoc, getFirestore, onSnapshot } from "firebase/firestore";

import React, { useContext, createContext } from 'react';

const db = getFirestore();
const auth = getAuth();
const FirebaseContext = createContext({})

export function useFirebase() {
  return useContext(FirebaseContext)
}

export const FirebaseProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState();
  const [userDoc, setUserDoc] = React.useState();
  const [orgDoc, setOrgDoc] = React.useState();
  const [inventoryData, setInventoryData] = React.useState([]);

  function firebaseRegister(email, password, firstNameValue, lastNameValue, orgId) {
    return new Promise((resolve, reject) => {
      if (email === "" || password === "" || firstNameValue === "" || lastNameValue === "" || orgId === "") {
        reject("Not all sign-in values filled out.")
        return;
      }
      getDoc(doc(collection(db, "organizations"), orgId)).then((response) => {
        if (response.exists) {
          email = email.toLowerCase();
          createUserWithEmailAndPassword(auth, email, password).then((response) => {
            const user = response.user
            if (user) {
              updateProfile(auth.currentUser, { displayName: (firstNameValue + " " + lastNameValue) })
              const uid = user.uid
              const data = {
                id: uid,
                hours: {},
                displayName: (firstNameValue + " " + lastNameValue),
                email,
                firstNameValue,
                orgId,
                lastNameValue,
                requiredHours: {},
                isActive: true,
                currentRequiredHours: 0
              }
              setDoc(doc(db, "users", uid), data).then(() => {
                resolve(response)
              }).catch((error) => {
                reject("Failed to create new user data")
                handleFirebaseErrors(error)
              });
            }
          }).catch((error) => {
            reject("Failed to create user")
            handleFirebaseErrors(error)
          });
        } else {
          reject("Failed to create user. Invalid Organization ID.")
        }
      }).catch(e => {
        handleFirebaseErrors(e);
      })
    })
  }

  function watchUserData(user) {
    return new Promise((resolve, reject) => {
      if (user) {
        const userDocumentListener = onSnapshot(doc(db, "users", user.uid), (userDocument) => {
          // console.log("Watching user doc...")
          // const userData = userDocument.data()
          if (userDocument) {
            console.log("Updating user doc...")
            setUserDoc(userDocument)
            resolve({ document: userDocument, unsubscriber: userDocumentListener })
          } else {
            reject('Watch user data failed. User document empty')
          }
        }, (err) => {
          if (err) {
            reject('Watch user data failed. Failed to get data from server')
            handleFirebaseErrors(err)
            console.log(err)
          }
        })
      } else {
        reject('Watch user data failed. User empty')
      }
    })
  }

  function watchOrgData(userDocument) {
    return new Promise((resolve, reject) => {
      // console.log("attempting to get org data")
      if (userDocument) {
        const orgDocumentListener = onSnapshot(doc(db, 'organizations', userDocument.data()?.orgId), (orgDocument) => {
          if (orgDocument) {
            console.log("Updating org data...")
            setOrgDoc(orgDocument)
            resolve({ document: orgDocument, unsubscriber: orgDocumentListener })
          } else {
            reject('Watch org data failed. Org document empty')
          }
        }, (err) => {
          if (err) {
            reject('Watch org data failed. Failed to get data from server')
            handleFirebaseErrors(err)
            console.log(err)
          }
        })
      } else {
        reject('Watch org data failed. User doc empty')
      }
    })
  }

  function getTestInventoryData(numElements) {
    const data = []
    for (let i = 0; i < numElements; i++) {
      data.push({
        id: i,
        title: "Sherbert",
        size: "Pint",
        units: 45,
        price: 12,
        outgoingUnits: 45
      })
    }
    return data;
  }

  function getUserRole(userId) {
    return orgDoc?.data()?.roles[userId] ? orgDoc?.data()?.roles[userId] : "user";
  }

  function handleFirebaseErrors(error) {
    console.log(error)
  }

  // React.useEffect(() => {
  //   const unsubscribers = [];
  //   const authUnsubscriber = onAuthStateChanged(auth, (user) => {
  //     setCurrentUser(user);
  //     if (user) {
  //       const userDataReturn = watchUserData(user);
  //       const orgDataReturn = watchOrgData(userDataReturn.document);

  //       unsubscribers.push(userDataReturn.unsubscriber)
  //       unsubscribers.push(orgDataReturn.unsubscriber)
  //       unsubscribers.push(authUnsubscriber)

  //     }
  //   })

  //   return () => {
  //     unsubscribers.forEach(unsubscriber => {
  //       unsubscriber();
  //     })
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  const firebaseData = {
    currentUser,
    firebaseRegister,
    userDoc,
    orgDoc,
    getTestInventoryData
  }

  return (
    <FirebaseContext.Provider value={firebaseData}>
      {children}
    </FirebaseContext.Provider>
  )
}

