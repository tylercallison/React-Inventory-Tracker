import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import React from "react"
import '../styles/App.css';
import { useFirebase } from '../components/FirestoreContext';
import logo from "../assets/icetracklogo.png";
import Loading from 'react-fullscreen-loading';

export default function ShipmentTracking() {
  // get the data from firebase, and call the function to generate the table of data
  const { isLoading, getShipmentElements, firebaseSignOut } = useFirebase()
  const [rowElements, setRowElements] = React.useState([]);
  let rows = []
  React.useEffect(() => {
    if (!isLoading) {
      (async function () {
        const result = await getShipmentElements();
        console.log(result);
        genAllTableRows(result);
      })()
    }
  }, [isLoading])

  //using data from firebase, organize it into a table with keys pertaining to each data type 
  function genAllTableRows(allRowData) {
    allRowData.map((data, key) => {
      rows.push(
        <tr key={key}>
          <td>{data.orderId}</td>
          <td>{String(data.customer)}</td>
          <td>{String(data.orderPlacedTimestamp.toDate())}</td>
          <td>{data.status}</td>
          <td>{String(data.expectedDeliveryDate.toDate())}</td>
          <td>{data.address}</td>
          <td>{data.billingAddress}</td>
          <td>{data.truck}</td>
        </tr>)
    })
    setRowElements(rows);
  }

  return (
    // design/layout of the shipment tracking screen, with the navbar followed by the title and add order button (currently non-functional),
    // as well as the table with data generated from firebase
    <div id="ShipmentTracking" style={{ flex: 1 }}>
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
      <Container fluid>
        <Loading loading={isLoading} background="white" loaderColor="#3498db" />
        <div className="row">
          <div className="col d-flex">
            <span style={{ fontSize: 45, fontWeight: 500 }} >Shipments Overview</span>
          </div>
          <div className="col d-flex flex-row-reverse">
            <Button style={{ margin: 10 }} onClick={() => window.location.href = "/orderentry"} variant="info">Add Order</Button>
          </div>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Time Order Placed</th>
              <th>Status</th>
              <th>Expected Arrival Time</th>
              <th>Shipping Address</th>
              <th>Billing Address</th>
              <th>Truck #</th>
            </tr>
          </thead>
          <tbody id=" TableBody">
            {rowElements}
          </tbody>
        </Table>
      </Container >
    </div >

  );
}
