import React from 'react';
import { Button, Form } from 'react-bootstrap';

function NewTicket() {
    return (
        <div className="container">
            <h1>Submit a ticket</h1>
            <div className="text-center" style={{ borderRadius: "5px", backgroundColor: "#31d2f2", color: "white", padding: "20px" }}>
                <h4>
                    Questions, comments, concerns? Need to track a shipment? Having issues with your order? Submit a ticket and we will get back to you as soon as possible!
                </h4>
            </div>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Subject:</Form.Label>
                    <Form.Control type="email" placeholder="Subject" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Type of Issue:</Form.Label>
                    <Form.Select aria-label="Default select example">
                        <option>Select an issue:</option>
                        <option>General</option>
                        <option>Order Entry</option>
                        <option>Inventory</option>
                        <option>Shipment Tracking</option>
                        <option>Other</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Describe your issue:</Form.Label>
                    <Form.Control as="textarea" rows={5} />
                </Form.Group>
                <Form.Group>
                    <br />
                    <Button color="info">Submit</Button>
                </Form.Group>
            </Form>
        </div>
    );
}

export default NewTicket;