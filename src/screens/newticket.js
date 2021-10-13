import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormTest } from 'reactstrap';

function NewTicket() {
    return (
        <div className="container">
            <h1>Submit a ticket</h1>
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
                    <Button color="success">Submit</Button>
                </FormGroup>
            </Form>
        </div>
    );
}

export default NewTicket;