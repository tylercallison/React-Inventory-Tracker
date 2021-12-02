import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import React from "react"
import '../styles/App.css';
import '../styles/InventorySystem.css';
import { useFirebase } from '../components/FirestoreContext';
import logo from "../assets/icetracklogo.png"
import Loading from 'react-fullscreen-loading';

export default function InventorySystem() {

  const { addInventoryElement, getInventoryElements, isLoading, unslugify, firebaseSignOut } = useFirebase()

  const [rowElements, setRowElements] = React.useState([]);
  const [inventoryModalShow, setInventoryModalShow] = React.useState(false);
  let rows = []

  React.useEffect(() => {
    if (!isLoading) {
      (async function () {
        const result = await getInventoryElements();
        console.log(result);
        genAllTableRows(result);
      })()
    }
  }, [isLoading])

  function genAllTableRows(allRowData) {
    allRowData.map((data, key) => {
      const sizesTDRow = []
      const unitsTDRow = []
      const pricesTDRow = []
      const outgoingTDRow = []

      const keys = data.prices ? Object.keys(data.prices) : null

      for (let i = 0; i < keys?.length; i++) {
        sizesTDRow.push(
          <tr className="itemEntry">
            {unslugify(keys[i])}
          </tr>
        );
        unitsTDRow.push(
          <tr className="itemEntry">
            {data.availableAmounts[keys[i]]}
          </tr>
        );
        pricesTDRow.push(
          <tr className="itemEntry">
            {data.prices[keys[i]]}
          </tr>
        );
        outgoingTDRow.push(
          <tr className="itemEntry">
            {data.pendingAmount[keys[i]]}
          </tr>
        );
      }
      rows.push(
        <tr key={data.flavor}>
          <td>{unslugify(data.flavor)}</td>
          <td>{sizesTDRow}</td>
          <td>{unitsTDRow}</td>
          <td>{pricesTDRow}</td>
          <td>{outgoingTDRow}</td>
        </tr>
      )
    })
    setRowElements(rows);
  }

  return (
    <div>
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
        <>
          <Loading loading={isLoading} background="white" loaderColor="#3498db" />
          <Container fluid>
            <Modal
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              show={inventoryModalShow}
              centered
            >
              <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                  Add Inventory
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" >
                    <Form.Label>Flavor</Form.Label>
                    <Form.Control type="text" placeholder="Vanilla" id="flavorInput" required />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Size</Form.Label>
                    <Form.Control type="text" placeholder="Gallon" id="sizeInput" required />
                  </Form.Group>
                  <Form.Group className="mb-3" >
                    <Form.Label>Units</Form.Label>
                    <Form.Control type="number" placeholder="12" min="0" id="unitsInput" required />
                  </Form.Group>
                  <Form.Group className="mb-3" >
                    <Form.Label>Price per Unit</Form.Label>
                    <Form.Control type="number" placeholder="12" min="0" id="priceInput" required />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={async (element) => {
                  await addInventoryElement(
                    document.getElementById("flavorInput").value,
                    document.getElementById("sizeInput").value,
                    document.getElementById("unitsInput").value,
                    document.getElementById("priceInput").value,
                  )
                  window.location.reload();
                }}>Submit</Button>
                <Button variant="secondary" onClick={() => setInventoryModalShow(false)}>Close</Button>
              </Modal.Footer>
            </Modal>

            <div id="InventorySystem" style={{ flex: 1 }}>
              <div className="row">
                <div className="col d-flex">
                  <span style={{ fontSize: 45, fontWeight: 500 }} >Inventory Overview</span>
                </div>
                <div className="col d-flex flex-row-reverse">
                  <Button style={{ margin: 10 }} variant="info" onClick={() => setInventoryModalShow(true)}>Add Inventory</Button>
                </div >
              </div >

              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Flavor</th>
                    <th>Sizes</th>
                    <th>Units</th>
                    <th>Prices</th>
                    <th>Outgoing Units</th>
                  </tr>
                </thead>
                <tbody id="invTableBody">
                  {rowElements}
                </tbody>
              </Table>
            </div >
          </Container >
        </>
      </Container>
    </div>
  );
}
