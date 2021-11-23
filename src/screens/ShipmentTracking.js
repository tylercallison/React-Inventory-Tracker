import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import React from "react"
import '../styles/App.css';
import { useFirebase } from '../components/FirestoreContext';
import logo from "../assets/icetracklogo.png";

export default function ShipmentTracking() {

  const { getTestShipmentData, isLoading, getShipmentElements } = useFirebase()

  // const [rowData, setRowData] = React.useState([]);
  const [rowElements, setRowElements] = React.useState([]);
  let rows = []

  React.useEffect(() => {
    // genAllTableRows(getTestInventoryData(5)) //make sure this number is same in test
    if (!isLoading) {
      (async function () {
        const result = await getShipmentElements();
        console.log(result);
        genAllTableRows(result);
      })()
    }
  }, [isLoading])

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

  function addTableRow(newData) {

    // TODO: add key prop of doc ID to tr element

    rows.push(
      <tr>
        <td>{newData.orderId}</td>
        {/* <td>{newData.customer}</td> */}
        {/* <td>{newData.orderPlacedTimestamp.toDate()}</td> */}
        <td>{newData.status}</td>
        {/* <td>{newData.expectedDeliveryDate.toDate()}</td> */}
        <td>{newData.address}</td>
        <td>{newData.billingAddress}</td>
        <td>{newData.truck}</td>
      </tr>)
    setRowElements(rows);
  }

  return (
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

              {/* <NavDropdown title="Trouble Tickets" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Ticket Entry</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Ticket Management</NavDropdown.Item>
                            </NavDropdown> */}
            </Nav>
            <Nav>
              <Nav.Link href="newticket">New Trouble Ticket</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid>
        <div className="row">
          <div className="col d-flex">
            <span style={{ fontSize: 45, fontWeight: 500 }} >Shipments Overview</span>
          </div>
          <div className="col d-flex flex-row-reverse">
            <Button style={{ margin: 10 }} variant="info">Add Order</Button>
            <Button style={{ margin: 10 }} variant="info">Add Shipment</Button>
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
