import React from 'react';
import { Button, Form, Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useFirebase } from '../components/FirestoreContext';
import { serverTimestamp } from "firebase/firestore";

function NewTicket() {

    const { submitNewTicket, slugify } = useFirebase()

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
                <Container fluid>
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#features">Features</Nav.Link>
                            <Nav.Link href="#pricing">Pricing</Nav.Link>
                            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#deets">More deets</Nav.Link>
                            <Nav.Link eventKey={2} href="#memes">
                                Dank memes
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container>
                <h1>Submit a ticket</h1>
                <div className="text-center" style={{ borderRadius: "5px", backgroundColor: "#31d2f2", color: "white", padding: "20px" }}>
                    <h4>
                        Questions, comments, concerns? Need to track a shipment? Having issues with your order? Submit a ticket and we will get back to you as soon as possible!
                    </h4>
                </div>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Subject:</Form.Label>
                        <Form.Control type="text" placeholder="Subject" id="subject" name="subject" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Type of Issue:</Form.Label>
                        <Form.Select id="issue-type" name="issue-type">
                            <option>Select an issue</option>
                            <option>General</option>
                            <option>Order Entry</option>
                            <option>Inventory</option>
                            <option>Shipment Tracking</option>
                            <option>Other</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Order Number:</Form.Label>
                        <Form.Control type="text" placeholder="Order Number" id="order-num" name="order-num" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Customer ID:</Form.Label>
                        <Form.Control type="text" placeholder="Customer Id" id="customer-id" name="customer-id" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Describe your issue:</Form.Label>
                        <Form.Control as="textarea" rows={5} placeholder="Description" id="description" name="description" />
                    </Form.Group>
                    <Form.Group>
                        <br />
                        <Button color="info" onClick={(element) => {
                            submitNewTicket({ orgId: "example" }, {
                                associatedOrder: document.getElementById("order-num").value,
                                customer: document.getElementById("customer-id").value,
                                description: document.getElementById("description").value,
                                issueName: document.getElementById("subject").value,
                                problemStatus: "unresolved",
                                problemType: slugify(document.getElementById("issue-type").value),
                                reportTimestamp: serverTimestamp(),
                                resolutionDescription: "",
                                resolvedTimestamp: "",
                                userReported: "",
                            }
                            )
                            window.location.reload();
                        }}>Submit</Button>
                    </Form.Group>
                </Form>
            </Container>
        </div>
    );
}

export default NewTicket;