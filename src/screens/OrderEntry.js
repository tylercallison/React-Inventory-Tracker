import React from 'react'
import * as ReactBootStrap from "react-bootstrap"
import GridLayout from 'react-grid-layout';


export default function OrderEntry() {
    const orderExamples = [
        {lineNumber: "1", itemName: "Vanilla", size: "1 qt", quantity: "1", estDelivery: "11/25/2021", lineTotal: "$5.00"},
        {lineNumber: "2", itemName: "Chocolate", size: "8 os", quantity: "5", estDelivery: "11/25/2021", lineTotal: "$20.00"},
        {lineNumber: "2", itemName: "Chocolate", size: "8 os", quantity: "5", estDelivery: "11/25/2021", lineTotal: "$20.00"},
        {lineNumber: "2", itemName: "Chocolate", size: "8 os", quantity: "5", estDelivery: "11/25/2021", lineTotal: "$20.00"},
        {lineNumber: "2", itemName: "Chocolate", size: "8 os", quantity: "5", estDelivery: "11/25/2021", lineTotal: "$20.00"},
        {lineNumber: "2", itemName: "Chocolate", size: "8 os", quantity: "5", estDelivery: "11/25/2021", lineTotal: "$20.00"},
        {lineNumber: "2", itemName: "Chocolate", size: "8 os", quantity: "5", estDelivery: "11/25/2021", lineTotal: "$20.00"},
        {lineNumber: "2", itemName: "Chocolate", size: "8 os", quantity: "5", estDelivery: "11/25/2021", lineTotal: "$20.00"},
    ]

    const layout = [
        {i: 'orderTable', x: 0, y: 0, w: 1, h: 2},
        {i: 'b', x: 0, y: 1, w: 0, h: 2},
    ]

    const renderOrder = (order, index) => {
        return(
            <tr key = {index}>
                <td>{order.lineNumber}</td>
                <td>{order.itemName}</td>
                <td>{order.size}</td>
                <td>{order.quantity}</td>
                <td>{order.estDelivery}</td>
                <td>{order.lineTotal}</td>
            </tr>
        )
    }
    return (
        <div>
            <GridLayout className="layout" layout={layout} cols={1} rowHeight={100}>
                <div key="orderTable">
                    <ReactBootStrap.Table striped bordered hover responsive="m">
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Item Name</th>
                            <th>Size</th>
                            <th>Quantity</th>
                            <th>Est. Delivery</th>
                            <th>Line Total</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {orderExamples.map(renderOrder)}
                        </tbody>
                    </ReactBootStrap.Table>
                </div>
        </GridLayout>
      </div>
      
        
    )
}
