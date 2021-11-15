import React from "react";
import { Card, Container, Button } from "react-bootstrap";
import '../styles/TroubleTicketManagement.css';

export default function TroubleTicketManagement(){

    let issues = {
        author: 'Cole',
        problemStatus: 'unsolved',
        dateReported: 'Oct 9th 2021',
        dateResolved: null,
        issueName: 'Info not accepted',
        issueType: 'order entry',
        issueSummary: 'I cant input a customers information'
    }  
    
    let curr = {
        author: 'Tyler',
        problemStatus: 'unsolved',
        dateReported: 'Oct 10th 2021',
        dateResolved: null,
        issueName: 'Rocky Road Out of Stock',
        issueType: 'Inventory',
        issueSummary: 'Rocky Road has ran out of stock. There is currently an order for 5 pints of Rocky Road that cannot be fulfilled due to lack of inventory.'
    }
    
    function genReport(){
        /*
        will create and download to device a pdf of a statistical summary report including
        # of problems reported, average time to solve problems, average # of new problems 
        per day, and average # of problems worked on per day.
        */
    }

    return(
        <div>
            <div className='IssueList'>
                <Container>
                    <Card border='info' className='TicketCard'>
                        <Card.Body>
                            <Card.Title>{ issues.issueName}</Card.Title>
                            <Card.Subtitle className='mb-2 text-muted' >{ issues.dateReported }</Card.Subtitle>
                            <Card.Text>{ issues.author }</Card.Text>
                            <Card.Text>{ issues.issueType }</Card.Text>
                        </Card.Body>
                    </Card> 
                </Container>
                <Container>
                    <Card border='info' text='white' bg='info' className='TicketCard'>
                        <Card.Body>
                            <Card.Title>{ curr.issueName}</Card.Title>
                            <Card.Subtitle style={{color: "black"}}>{ curr.dateReported }</Card.Subtitle>
                            <Card.Text>{ curr.author }</Card.Text>
                            <Card.Text>{ curr.issueType }</Card.Text>
                        </Card.Body>
                    </Card> 
                </Container>

                <Container>
                    <Card border='info' className='TicketCard'>
                        <Card.Body>
                            <Card.Title>{ issues.issueName}</Card.Title>
                            <Card.Subtitle className='mb-2 text-muted'>{ issues.dateReported }</Card.Subtitle>
                            <Card.Text>{ issues.author }</Card.Text>
                            <Card.Text>{ issues.issueType }</Card.Text>
                        </Card.Body>
                    </Card> 
                </Container>

                <Container>
                    <Card border='info' className='TicketCard'>
                        <Card.Body>
                            <Card.Title>{ issues.issueName}</Card.Title>
                            <Card.Subtitle className='mb-2 text-muted'>{ issues.dateReported }</Card.Subtitle>
                            <Card.Text>Issue Author: { issues.author }</Card.Text>
                            <Card.Text>Issue Type: { issues.issueType }</Card.Text>
                        </Card.Body>
                    </Card> 
                </Container>

                <Container>
                    <Card border='info' className='TicketCard'>
                        <Card.Body>
                            <Card.Title>{ issues.issueName}</Card.Title>
                            <Card.Subtitle className='mb-2 text-muted'>{ issues.dateReported }</Card.Subtitle>
                            <Card.Text>{ issues.author }</Card.Text>
                            <Card.Text>{ issues.issueType }</Card.Text>
                        </Card.Body>
                    </Card> 
                </Container>
            </div>
            <div className='CurrentIssue'>
                <Card>
                    <Card.Header>
                        <Card.Title>{curr.issueName}</Card.Title>
                        <Card.Subtitle className='text-muted'>Date Reported: {curr.dateReported}</Card.Subtitle>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text >Issue Author: {curr.author}</Card.Text>
                        <Card.Text>{curr.issueSummary}</Card.Text>
                        <Card.Text></Card.Text>
                    </Card.Body>
                </Card>

                <Button style={{}}>Generate Report</Button>
            </div>
        </div>
    );
}