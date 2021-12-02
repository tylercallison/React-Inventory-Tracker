import React from "react";
import { Card, Container, Button, Navbar, Nav } from "react-bootstrap";
import '../styles/TroubleTicketManagement.css';
import { useFirebase } from '../components/FirestoreContext';
import logo from "../assets/icetracklogo.png"
import Loading from 'react-fullscreen-loading';

export default function TroubleTicketManagement() {

    const { getTroubleTickets, firebaseSignOut, isLoading } = useFirebase();


    const [sidebarElements, setSidebarElements] = React.useState([]);
    const [mainElement, setMainElement] = React.useState([]);

    function genReport() {
        /*
        will create and download to device a pdf of a statistical summary report including
        # of problems reported, average time to solve problems, average # of new problems 
        per day, and average # of problems worked on per day.
        */
        window.print();
    }

    React.useEffect(() => {
        (async function () {
            const returnTroubleTickets = await getTroubleTickets("example");
            const sidebarElements = genSideBar(returnTroubleTickets);

            if (sidebarElements.length > 0) {
                genMainCard(sidebarElements[0])
            }
        })();
    }, [])

    // generates the sidebar with all the trouble ticket data within the database
    function genSideBar(issueList) {
        let cards = [];
        let cardData = [];

        if (issueList.size != 0) {
            issueList.forEach(doc => {
                const currDoc = doc.data();
                cardData.push(currDoc);
                cards.push(
                    <div onClick={(element) => genMainCard(currDoc)}>
                        <Card border='info' className='TicketCard'>
                            <Card.Body>
                                <Card.Title>{currDoc.issueName}</Card.Title>
                                <Card.Subtitle className='mb-2 text-muted'>{String(currDoc.reportTimestamp.toDate())}</Card.Subtitle>
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

    // An on click function, when called the ticket clicked is then generated as the main card on right of screen
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
            <Card style={{ marginTop: 10 }}>
                <Card.Header>
                    <Card.Title>{mainIssue.issueName}</Card.Title>
                    <Card.Subtitle className='text-muted'>Date Reported: {mainIssue.reportTimestamp}</Card.Subtitle>
                </Card.Header>
                <Card.Body>
                    <Card.Text >Issue Author: {mainIssue.userReported}</Card.Text>
                    <Card.Text>{mainIssue.description}</Card.Text>
                    {mainIssue.resolutionDescription ? <Card.Text>Test Resolution</Card.Text> : null}
                </Card.Body>
                <Button style={{}} onClick={() => genReport()}>Generate Report</Button>
            </Card>
        )
        setMainElement(mainCard);
    }

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
                <Container fluid>
                    <Navbar.Brand href="#home"><img src={logo} width="100px" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/inventory">Inventory</Nav.Link>
                            <Nav.Link href="/orderentry">Order Entry</Nav.Link>
                            <Nav.Link href="/shipmenttracking">Shipment Tracking</Nav.Link>
                            <Nav.Link href="/troubleticketmanagement">Trouble Ticket Management</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="newticket">New Trouble Ticket</Nav.Link>
                            <Nav.Link onClick={(e) => firebaseSignOut()}>Sign Out</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Loading loading={isLoading} background="white" loaderColor="#3498db" />
            <div className='IssueList' style={{ height: window.innerHeight, overflowY: 'scroll' }}>
                <Container>
                    {sidebarElements}
                </Container>
            </div>
            <div className='CurrentIssue'>
                {mainElement}
            </div>
        </>
    );
}