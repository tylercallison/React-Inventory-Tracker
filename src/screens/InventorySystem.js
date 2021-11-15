import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import React from "react"
import '../styles/App.css';
import { useFirebase } from '../components/FirestoreContext';

export default function InventorySystem() {

  const { getTestInventoryData } = useFirebase()

  // const [rowData, setRowData] = React.useState([]);
  const [rowElements, setRowElements] = React.useState([]);
  let rows = []

  React.useEffect(() => {
    genAllTableRows(getTestInventoryData(5)) //make sure this number is same in test
  }, [])

  function genAllTableRows(allRowData) {
    allRowData.map((data, key) => {
      rows.push(
        <tr key={key}>
          <td>{data.id}</td>
          <td>{data.title}</td>
          <td>{data.size}</td>
          <td>{data.units}</td>
          <td>{data.price}</td>
          <td>{data.outgoingUnits}</td>
        </tr>)
    })
    setRowElements(rows);
  }

  function addTableRow(newData) {

    // TODO: add key prop of doc ID to tr element

    rows.push(
      <tr>
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
    <div id="InventorySystem" style={{ flex: 1 }}>
      <div className="row">
        <div className="col d-flex">
          <span style={{ fontSize: 45, fontWeight: 500 }} >Inventory Overview</span>
        </div>
        <div className="col d-flex flex-row-reverse">
          <Button style={{ margin: 10 }} variant="info">Add Order</Button>
          <Button style={{ margin: 10 }} variant="info">Add Shipment</Button>
        </div>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Item ID</th>
            <th>Title</th>
            <th>Size</th>
            <th>Units</th>
            <th>Price</th>
            <th>Outgoing Units</th>
          </tr>
        </thead>
        <tbody id="invTableBody">
          {rowElements}
        </tbody>
      </Table>
    </div >
  );
}
