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
                id: i,
                associatedOrder: i,
                customer: "Bob",
                description: "Missing inv, Bob needs his f**king vanilla ice cream",
                issueName: "Inventory Missing",
                problemStatus: "unresolved",
                problemType: "major",
                reportTimestamp: "Nov 1st",
                resolutionDescription: "not resolved yet",
                resolutionTimestamp: "",
                userReported: "Cole",
            })
        }
        for(let i = 0; i < 5; i++){
            issues.push({
                id: i+10,
                associatedOrder: i+10,
                customer: "George",
                description: "Customer information not found",
                issueName: "Error connecting order to customer",
                problemStatus: "unresolved",
                problemType: "major",
                reportTimestamp: "Nov 3rd",
                resolutionDescription: "not resolved yet",
                resolutionTimestamp: "",
                userReported: "Tyler",
            })
        }
        genSideBar(issues);
    }, [])

    function genSideBar(issueList){
        let cards = [];
        issueList.map((data, key)=> {
            cards.push(
                <div onClick={(element) => genMainCard(data)}>
                    <Card  border='info' className='TicketCard' id={key}>
                        <Card.Body>
                            <Card.Title>{data.issueName}</Card.Title>
                            <Card.Subtitle className='mb-2 text-muted'>{data.reportTimestamp}</Card.Subtitle>
                            <Card.Text>{data.userReported}</Card.Text>
                            <Card.Text>{data.problemType}</Card.Text>
                        </Card.Body>
                    </Card>
                </div>        
            )
        })
        setSidebarElements(cards);
    }

    function genMainCard(iss){
        let mainIssue = {
            id: iss.id,
            associatedOrder: iss.associatedOrder,
            customer: iss.customer,
            description: iss.description,
            issueName: iss.issueName,
            problemStatus: iss.problemStatus,
            problemType: iss.problemType,
            reportTimestamp: iss.reportTimestamp,
            resolutionDescription: iss.resolutionDescription,
            resolutionTimestamp: iss.resolutionTimestamp,
            userReported: iss.userReported,
        };
        console.log(mainIssue);
        let mainCard=(
                <Card>
                    <Card.Header>
                        <Card.Title>{mainIssue.issueName}</Card.Title>
                        <Card.Subtitle className='text-muted'>Date Reported: {mainIssue.reportTimestamp}</Card.Subtitle>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text >Issue Author: {mainIssue.userReported}</Card.Text>
                        <Card.Text>{mainIssue.description}</Card.Text>
                        <Card.Text></Card.Text>
                    </Card.Body>
                </Card>
        )
        setMainElement(mainCard);
    }

    return(
        <div>
            <div className='IssueList' style={{height: window.innerHeight, overflowY: 'scroll'}}>
                <Container>
                    {sidebarElements}
                </Container>
            </div>
            <div className='CurrentIssue'>
                {mainElement}
                <Button style={{}}>Generate Report</Button>
            </div>
        </div>
    );
}