import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useFirebase } from '../components/FirestoreContext';

import '../styles/Login.css'

function Login() {

    const { firebaseSignIn } = useFirebase()

    return (
        <div className="container-center-horizontal">
            <div class="login-mario screen">
                <div class="flex-col">
                    <p class="text-1 roboto-normal-black-12px">
                        Welcome back!<br />Please log into your account, or create an account.
                    </p>

                    <Form>
                        <Form.Group className="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" id="emailValue" />
                        </Form.Group>
                        <Form.Group className="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" id="passValue" />
                        </Form.Group>
                        <a href="/createAccount" className="link-primary">Create Account</a>
                        <Button variant="primary" onClick={(element) => {
                            console.log(document.getElementById("emailValue").value)
                            var email = document.getElementById("emailValue").value;
                            var pass = document.getElementById("passValue").value
                            firebaseSignIn(email, pass);
                        }}>
                            Submit
                        </Button>
                    </Form>
                </div>
                <div class="overlap-group">
                    <h1 class="text-2">Neapolitan Solutions</h1>
                    <div class="text-3 roboto-normal-white-16px">
                        Need help?<br />Just contact us.
                    </div>
                    <div class="text-4 roboto-normal-white-16px">
                        +123 456 7890<br />support@neapolitansolutions.com
                    </div>
                    <p class="text-5 roboto-normal-white-16px">
                        © 2021 Neapolitan Solutions Co. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;