import React from "react";
import { Card } from "react-bootstrap";
import '../styles/TroubleTicket.css';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        //for each issue that is unresolved made a card with its corresponding data (name,summary, author, type, date of creation)
        <div className="ticketList"> 
            <div>
                <Card style={{width: '18rem'}}>
                    <Card.Body>
                        <Card.Title style={{textAlign: 'left', display: 'flex'}}>Issue Title</Card.Title>
                        <Card.Text style={{textAlign: 'right', display: 'inline-flex'}}># days ago</Card.Text>
                        <Card.Text>issue summary here</Card.Text>
                        <Card.Text>Issue Author</Card.Text>
                        <Card.Text>Issue Type </Card.Text>
                    </Card.Body>
            </Card>
            </div>
            <div>
                <Card style={{width: '18rem'}}>
                    <Card.Body>
                        <Card.Title style={{textAlign: 'left', display: 'flex'}}>Issue Title</Card.Title>
                        <Card.Text style={{textAlign: 'right', display: 'inline-flex'}}># days ago</Card.Text>
                        <Card.Text>issue summary here</Card.Text>
                        <Card.Text>Issue Author</Card.Text>
                        <Card.Text>Issue Type </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default App;
