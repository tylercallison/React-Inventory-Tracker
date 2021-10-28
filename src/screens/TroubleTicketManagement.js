import React from "react";
import { Card, Container, Button } from "react-bootstrap";
import '../styles/TroubleTicketManagement.css';

export default function TroubleTicketManagement(){
    
    const [sidebarElements, setSidebarElements] = React.useState([]);
    const [mainElement, setMainElement] = React.useState([]);

    function genReport(){
        /*
        will create and download to device a pdf of a statistical summary report including
        # of problems reported, average time to solve problems, average # of new problems 
        per day, and average # of problems worked on per day.
        */
    }

    React.useEffect(() => {
        let issues = [];
        for(let i = 0; i < 5; i++){
            issues.push({
                issueName: "Problem " + (i+1),
                dateReported: "10/23/2020",
                author: "Tyler",
                issueType: "Major",
            })
        }
        let mainIssue = [];
        mainIssue.push({
            issueName: "Rocky Road is out of stock",
            dateReported: "10/27/2021",
            author: "Cole",
            issueSummary: "A previous order claimed the last of the rocky road from the inventory. Rocky Road is now out of stock and we need to replenish the inventory.",
        })
        genSideBar(issues);
        genMainCard(mainIssue);
    }, [])

    function genSideBar(issueList){
        let cards = [];
        issueList.map((data, key)=> {
            cards.push(
                <Container id={key}>
                    <Card border='info' className='TicketCard'>
                        <Card.Body>
                            <Card.Title>{data.issueName}</Card.Title>
                            <Card.Subtitle className='mb-2 text-muted'>{data.dateReported}</Card.Subtitle>
                            <Card.Text>{data.author}</Card.Text>
                            <Card.Text>{data.issueType}</Card.Text>
                        </Card.Body>
                    </Card>
                </Container>
            )
        })
        console.log(cards);
        setSidebarElements(cards);
    }

    function genMainCard(mainIssue){
        let mainCard;
        mainIssue.map((data,key)=>{
            mainCard =[
                <Card>
                    <Card.Header>
                        <Card.Title>{data.issueName}</Card.Title>
                        <Card.Subtitle className='text-muted'>Date Reported: {data.dateReported}</Card.Subtitle>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text >Issue Author: {data.author}</Card.Text>
                        <Card.Text>{data.issueSummary}</Card.Text>
                        <Card.Text></Card.Text>
                    </Card.Body>
                </Card>
            ]
        })
        console.log(mainCard);
        setMainElement(mainCard);
    }

    return(
        <div>
            <div className='IssueList'>
                {sidebarElements}
            </div>
            <div className='CurrentIssue'>
                {mainElement}
                <Button style={{}}>Generate Report</Button>
            </div>
        </div>
    );
}