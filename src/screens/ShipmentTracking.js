import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import React from "react"
import '../styles/App.css';
import { useFirebase } from '../components/FirestoreContext';

export default function ShipmentTracking() {

  const { getTestShipmentData } = useFirebase()

  // const [rowData, setRowData] = React.useState([]);
  const [rowElements, setRowElements] = React.useState([]);
  let rows = []

  React.useEffect(() => {
    genAllTableRows(getTestShipmentData(8)) //make sure this number is same in test
  }, [])

  function genAllTableRows(allRowData) {
    allRowData.map((data, key) => {
      rows.push(
        <tr key={key}>
          <td>{data.orderId}</td>
          <td>{data.customer}</td>
          <td>{data.orderPlacedTimestamp}</td>
          <td>{data.status}</td>
          <td>{data.expectedDeliveryDate}</td>
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
        <td>{newData.customer}</td>
        <td>{newData.orderPlacedTimestamp}</td>
        <td>{newData.status}</td>
        <td>{newData.expectedDeliveryDate}</td>
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
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
              <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link href="#deets">More deets</Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                Dank memes
              </Nav.Link>
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
