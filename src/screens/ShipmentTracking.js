import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
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
    </div >
  );
}
