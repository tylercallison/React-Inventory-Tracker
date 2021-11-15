import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import React from "react"
import '../styles/App.css';
import '../styles/InventorySystem.css';
import { useFirebase } from '../components/FirestoreContext';

export default function InventorySystem() {

  const { getTestInventoryData, addInventoryElement } = useFirebase()

  // const [rowData, setRowData] = React.useState([]);
  const [rowElements, setRowElements] = React.useState([]);
  const [inventoryModalShow, setInventoryModalShow] = React.useState(false);
  const [shipmentModalShow, setShipmentModalShow] = React.useState(false);
  const [orderModalShow, setOrderModalShow] = React.useState(false);
  const [fullscreen, setFullscreen] = React.useState(true);
  const [show, setShow] = React.useState(false);
  let rows = []

  React.useEffect(() => {
    genAllTableRows(getTestInventoryData(5)) //make sure this number is same in test
  }, [])

  function handleShow() {
    setFullscreen(true);
    setShow(true);
  }

  function genAllTableRows(allRowData) {
    allRowData.map((data, key) => {
      const sizesTDRow = []
      const unitsTDRow = []
      const pricesTDRow = []
      const outgoingTDRow = []

      for (let i = 0; i < data.sizes.length; i++) {
        sizesTDRow.push(
          <tr className="itemEntry">
            {data.sizes[i]}
          </tr>
        );
        unitsTDRow.push(
          <tr className="itemEntry">
            {data.units[i]}
          </tr>
        );
        pricesTDRow.push(
          <tr className="itemEntry">
            {data.prices[i]}
          </tr>
        );
        outgoingTDRow.push(
          <tr className="itemEntry">
            {data.outgoingUnits[i]}
          </tr>
        );
      }
      rows.push(
        <tr key={key} onClick={() => handleShow()}>
          <td>{data.flavor}</td>
          <td>{sizesTDRow}</td>
          <td>{unitsTDRow}</td>
          <td>{pricesTDRow}</td>
          <td>{outgoingTDRow}</td>
        </tr>)
    })
    setRowElements(rows);
  }

  function addTableRow(newData) {

    // TODO: add key prop of doc ID to tr element

    rows.push(
      <tr onClick={() => handleShow()}>
        <td>{newData.id}</td>
        <td>{newData.title}</td>
        <td>{newData.size}</td>
        <td>{newData.units}</td>
        <td>{newData.price}</td>
        <td>{newData.outgoingUnits}</td>
      </tr>)
    setRowElements(rows);
  }

  return (

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
              <Form.Label>New Price per Unit (Leave blank if unchanged)</Form.Label>
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
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        show={shipmentModalShow}
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Shipment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShipmentModalShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        show={orderModalShow}
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Order
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOrderModalShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>Modal body content</Modal.Body>
      </Modal>

      <div id="InventorySystem" style={{ flex: 1 }}>
        <div className="row">
          <div className="col d-flex">
            <span style={{ fontSize: 45, fontWeight: 500 }} >Inventory Overview</span>
          </div>
          <div className="col d-flex flex-row-reverse">
            <Button style={{ margin: 10 }} variant="info" onClick={() => setOrderModalShow(true)}>Add Order</Button>
            <Button style={{ margin: 10 }} variant="info" onClick={() => setShipmentModalShow(true)}>Add Shipment</Button>
            <Button style={{ margin: 10 }} variant="info" onClick={() => setInventoryModalShow(true)}>Add Inventory</Button>
          </div>
        </div>

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
  );
}
