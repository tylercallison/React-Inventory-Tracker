import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

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
                <FormGroup>
                    <Label for="subject">Subject</Label>
                    <Input type="text" name="subject" id="subject" placeholder="Ticket Subject" />
                </FormGroup>
                <FormGroup>
                    <Label for="type">Subject</Label>
                    <Input type="select" name="type" id="type">
                        <option>General</option>
                        <option>Order Entry</option>
                        <option>Inventory</option>
                        <option>Shipment Tracking</option>
                        <option>Other</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="description">Problem Description</Label>
                    <Input type="textarea" name="description" id="description" placeholder="Tell us what you want here." />
                </FormGroup>
                <FormGroup>
                    <br />
                    <Button color="info">Submit</Button>
                </FormGroup>
            </Form>
        </div>
    );
}

export default NewTicket;