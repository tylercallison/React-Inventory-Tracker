import React from "react";
import { Card, Container, Button } from "react-bootstrap";
import '../styles/TroubleTicketManagement.css';
import { useFirebase } from '../components/FirestoreContext';

export default function TroubleTicketManagement() {

    let mainCardDisplayed = 0;
    const { userDoc, getTroubleTickets } = useFirebase();


    const [sidebarElements, setSidebarElements] = React.useState([]);
    const [mainElement, setMainElement] = React.useState([]);

    function genReport() {
        /*
        will create and download to device a pdf of a statistical summary report including
        # of problems reported, average time to solve problems, average # of new problems 
        per day, and average # of problems worked on per day.
        */
    }

    React.useEffect(() => {
        // let issues = [];
        // for(let i = 0; i < 5; i++){
        //     issues.push({
        //         id: i,
        //         associatedOrder: i,
        //         customer: "Bob",
        //         description: "Missing inv, Bob needs his f**king vanilla ice cream",
        //         issueName: "Inventory Missing",
        //         problemStatus: "unresolved",
        //         problemType: "major",
        //         reportTimestamp: "Nov 1st",
        //         resolutionDescription: "not resolved yet",
        //         resolutionTimestamp: "",
        //         userReported: "Cole",
        //     })
        // }
        // for(let i = 0; i < 5; i++){
        //     issues.push({
        //         id: i+10,
        //         associatedOrder: i+10,
        //         customer: "George",
        //         description: "Customer information not found",
        //         issueName: "Error connecting order to customer",
        //         problemStatus: "unresolved",
        //         problemType: "major",
        //         reportTimestamp: "Nov 3rd",
        //         resolutionDescription: "not resolved yet",
        //         resolutionTimestamp: "",
        //         userReported: "Tyler",
        //     })
        // }

        (async function () {
            const returnTroubleTickets = await getTroubleTickets("example");
            const sidebarElements = genSideBar(returnTroubleTickets);

            if (sidebarElements.length > 0) {
                genMainCard(sidebarElements[0])
            }
        })();
    }, [])

    function genSideBar(issueList) {
        let cards = [];
        let cardData = [];

        if (issueList.size != 0) {
            issueList.forEach(doc => {
                const currDoc = doc.data();
                cardData.push(currDoc);
                // console.log(currDoc.reportTimestamp.toDate())
                cards.push(
                    <div onClick={(element) => genMainCard(currDoc)}>
                        <Card border='info' className='TicketCard'>
                            <Card.Body>
                                <Card.Title>{currDoc.issueName}</Card.Title>
                                <Card.Subtitle className='mb-2 text-muted'>{String(currDoc.reportTimestamp.toDate())}</Card.Subtitle>
                                {/* <Card.Text>{JSON.stringify(currDoc.userReported)}</Card.Text> */}
                                <Card.Text>{currDoc.problemType}</Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                )
            })
        }
        console.log(cards)
        setSidebarElements(cards);
        return cardData;
    }

    function genMainCard(iss) {
        let mainIssue = {
            associatedOrder: iss.associatedOrder,
            customer: iss.customer,
            description: iss.description,
            issueName: iss.issueName,
            problemStatus: iss.problemStatus,
            problemType: iss.dataproblemType,
            reportTimestamp: String(iss.reportTimestamp?.toDate()),
            resolutionDescription: iss.resolutionDescription,
            resolutionTimestamp: String(iss.resolutionTimestamp?.toDate()),
            userReported: String(iss.userReported),
        };
        console.log(mainIssue);
        let mainCard = (
            <Card>
                <Card.Header>
                    <Card.Title>{mainIssue.issueName}</Card.Title>
                    <Card.Subtitle className='text-muted'>Date Reported: {mainIssue.reportTimestamp}</Card.Subtitle>
                </Card.Header>
                <Card.Body>
                    <Card.Text >Issue Author: {mainIssue.userReported}</Card.Text>
                    <Card.Text>{mainIssue.description}</Card.Text>
                    {mainIssue.resolutionDescription ? <Card.Text>Test Resolution</Card.Text> : null}
                </Card.Body>
                <Button style={{}}>Generate Report</Button>
            </Card>
        )
        setMainElement(mainCard);
    }

    return (
        <div>
            <div className='IssueList' style={{ height: window.innerHeight, overflowY: 'scroll' }}>
                <Container>
                    {sidebarElements}
                </Container>
            </div>
            <div className='CurrentIssue'>
                {mainElement}
            </div>
        </div>
    );
}