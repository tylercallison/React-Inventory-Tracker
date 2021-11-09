import "../config"
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc, getDoc, getFirestore, onSnapshot, query, addDoc, getDocs, where } from "firebase/firestore";

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
  const [issueData, setIssueData] = React.useState([]);
  const [inventoryData, setInventoryData] = React.useState([]);
  const [tickets, setTickets] = React.useState([]);
  const [shipmentData, setShipmentData] = React.useState([]);

  function slugify(string) {
    return string
      .toString()
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  }

  function firebaseSignIn(email, password) {
    return signInWithEmailAndPassword(email, password)
  }

  function firebaseRegister(email, password, firstName, lastName, orgId) {
    return new Promise((resolve, reject) => {
      if (email === "" || password === "" || firstName === "" || lastName === "" || orgId === "") {
        reject("Not all sign-in values filled out.")
        return;
      }

      email = email.toLowerCase().trim();
      firstName = firstName.trim()
      firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
      lastName = lastName.trim()
      lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
      orgId = orgId.trim();

      getDoc(doc(collection(db, "organization"), orgId)).then((response) => {
        if (response.exists) {
          email = email.toLowerCase();
          createUserWithEmailAndPassword(auth, email, password).then((response) => {
            const user = response.user
            if (user) {
              updateProfile(auth.currentUser, { displayName: (firstName + " " + lastName) })
              const uid = user.uid
              const data = {
                id: uid,
                displayName: (firstName + " " + lastName),
                email,
                firstName,
                orgId,
                lastName,
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

  /*

  ticket = {
    order: String
    customer
    description
    problemType
  }

  */

  function submitNewTicket(user, ticket) {
    return new Promise(async (resolve, reject) => {
      if (user) {
        // TODO: Add type checking
        const newTicket = await addDoc(collection(db, "organization", user.orgId, "tickets"), ticket);
        if (newTicket) {
          setTickets(old => [...old, newTicket])
          resolve(newTicket);
        }
        else {
          reject("Failed to add new ticket. Unknown error occured");
        }
      } else {
        reject('Could not add ticket. User is not defined');
      }
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

  function getUserData(user) {
    return new Promise(async (resolve, reject) => {
      if (user) {
        const userDocumentListener = await getDoc(doc(db, "users", user.uid), (userDocument) => {
          console.log("Getting user doc...")
          if (userDocument) {
            console.log("Updating user doc...")
            setUserDoc(userDocument)
            resolve({ document: userDocument, unsubscriber: userDocumentListener })
          } else {
            reject('Get user data failed. User document empty')
          }
        }, (err) => {
          if (err) {
            reject('get user data failed. Failed to get data from server')
            handleFirebaseErrors(err)
            console.log(err)
          }
        })
      } else {
        reject('Get user data failed. User empty')
      }
    })
  }

  function getTroubleTickets(orgId, lowerTimestamp = 0, upperTimestamp = 0) {
    return new Promise(async (resolve, reject) => {
      if (orgId) {
        console.log("Getting trouble tickets...")
        if (lowerTimestamp && upperTimestamp) {
          const troubleTicketsReturn = await getDocs(query(collection(db, "organization", orgId, "tickets"), where("reportTimestamp", ">=", lowerTimestamp), where("reportTimestamp", "<=", upperTimestamp)))
          // console.log("Size: " + troubleTicketsReturn.size)
          troubleTicketsReturn.forEach((ticket) => {
            console.log(ticket)
          });
          resolve(troubleTicketsReturn);
        } else {
          const troubleTicketsReturn = await getDocs(query(collection(db, "organization", orgId, "tickets")))
          // console.log("Size: " + troubleTicketsReturn.size)
          troubleTicketsReturn.forEach((ticket) => {
            console.log(ticket.data())
          });
          // console.log(troubleTicketsReturn);
          resolve(troubleTicketsReturn);
        }
      } else {
        reject('Get trouble ticket data failed. User empty')
      }
    })
  }

  function watchOrgData(orgId) {
    return new Promise((resolve, reject) => {
      // console.log("attempting to get org data")
      if (orgId) {
        const orgDocumentListener = onSnapshot(doc(db, 'organization', orgId), (orgDocument) => {
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

  function getTestshipmentData(numElements) {
    const data = []
    for (let i = 1; i <= numElements; i++) {
      data.push({
        orderId: i,
        customer: "BillyBob",
        orderPlacedTimestamp: "10/07/2021, 19:02:00 UTC-8:00",
        status: "in-progress",
        expectedDeliveryDate: "November 10th, 2021",
        address: "5500 Campanile Drive, San Diego, CA, 92115",
        billingAddress: "5500 Campanile Drive, San Diego, CA, 92115 ",
        truck: (i % 3)
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

  React.useEffect(() => {
    const unsubscribers = [];
    const authUnsubscriber = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        const userDataReturn = watchUserData(user);
        const orgDataReturn = watchOrgData(userDataReturn.document);

        unsubscribers.push(userDataReturn.unsubscriber)
        unsubscribers.push(orgDataReturn.unsubscriber)
        unsubscribers.push(authUnsubscriber)

      } else {
        if (window.location.pathname !== "/login" && window.location.pathname !== "/createAccount") {
          // console.log(window.location.pathname)
          window.location.assign("/login");
        }
      }
    })

    return () => {
      unsubscribers.forEach(unsubscriber => {
        unsubscriber();
      })
    }
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const firebaseData = {
    currentUser,
    firebaseRegister,
    userDoc,
    orgDoc,
    getTestInventoryData,
    getTroubleTickets,
    submitNewTicket,
    slugify,
    firebaseSignIn,
    getTestshipmentData
  }

  return (
    <FirebaseContext.Provider value={firebaseData}>
      {children}
    </FirebaseContext.Provider>
  )
}

