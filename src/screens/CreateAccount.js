import { signInWithEmailAndPassword } from '@firebase/auth';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useFirebase } from '../components/FirestoreContext';

function CreateAccount() {

    const { firebaseRegister } = useFirebase()

    return (
        <div className="container">
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="First Name" id="first-name" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Last Name" id="last-name" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" id="emailValue" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" id="passValue" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Organization ID</Form.Label>
                    <Form.Control type="text" placeholder="Organization" id="orgValue" />
                </Form.Group>
                <a href="/login" className="link-primary">Already have an account? Sign In</a>
                <Button variant="primary" onClick={element => {
                    firebaseRegister(
                        document.getElementById("emailValue").value,
                        document.getElementById("passValue").value,
                        document.getElementById("first-name").value,
                        document.getElementById("last-name").value,
                        document.getElementById("orgValue").value,
                    );
                    window.location.assign("/login");
                }
                }>
                    Create Account
                </Button>
            </Form>
        </div>
    );
}

export default CreateAccount;