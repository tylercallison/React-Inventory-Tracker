import React, { useState } from 'react'
import * as ReactBootStrap from "react-bootstrap"
import GridLayout from 'react-grid-layout';
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from '../components/DatePicker.js'


export default function OrderEntry() {
    const orderExamples = [
        {lineNumber: "1", itemName: "Vanilla", size: "1 qt", quantity: "1", estDelivery: new Date("11/25/2021"), lineTotal: "$5.00"},
        {lineNumber: "2", itemName: "Chocolate", size: "8 os", quantity: "5", estDelivery: new Date("11/25/2021"), lineTotal: "$20.00"},
        {lineNumber: "3", itemName: "Chocolate", size: "8 os", quantity: "5", estDelivery: new Date("11/25/2021"), lineTotal: "$20.00"},
        {lineNumber: "4", itemName: "Chocolate", size: "8 os", quantity: "5", estDelivery: new Date("11/25/2021"), lineTotal: "$20.00"},
        {lineNumber: "5", itemName: "Chocolate", size: "8 os", quantity: "5", estDelivery: new Date("11/25/2021"), lineTotal: "$20.00"}
    ]

    const layout = [
        {i: 'orderTable', x: 0, y: 0, w: 1, h: 2},
    ]

    const renderOrder = (order, index) => {
        return(
            <tr key = {index}>
                <td>{order.lineNumber}</td>
                <td>
                    <input list="item_names" name="input_normal" defaultValue={order.itemName}/>
                    <datalist id="item_names">
                        <option value="Vanilla"/>
                        <option value="Chocolate"/>
                        <option value="Strawberry"/>
                    </datalist>
                </td>
                <td>
                    <select class="form-control">
                        <option>1 pt</option>
                        <option>2 pt</option>
                        <option>1 qt</option>
                        <option>2 qt</option>
                    </select>
                </td>
                <td>
                    <input defaultValue = {order.quantity}/>
                </td>
                <td>
                    <DatePicker initialDate = {order.estDelivery}/>
                </td>
                <td>{order.lineTotal}</td>
            </tr>
        )
    }
    return (
        <div>
            {/*<GridLayout className="layout" layout={layout} cols={2} rowHeight={100}>*/}
                <div key="orderTable">
                    <ReactBootStrap.Table striped bordered hover responsive="m">
                        <thead>
                            <tr>
                            <th>#</th>
                            <th class="vertical-align: middle">Item Name</th>
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
        {/*</GridLayout>*/}
      </div>
    )
}