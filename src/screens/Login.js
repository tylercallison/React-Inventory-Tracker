import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useFirebase } from '../components/FirestoreContext';

function Login() {

    const { firebaseSignIn } = useFirebase()

    return (
        <div className="container">
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" id="emailValue" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" id="passValue" />
                </Form.Group>
                <a href="/createAccount" className="link-primary">Create Account</a>
                <Button variant="primary" type="submit" onClick={element => {
                    firebaseSignIn(document.getElementById("emailValue").value, document.getElementById("passValue").value);
                    window.location.assign("/inventory");
                }}>
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default Login;