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
            <div responsive= "m" style = {{"display" : 'flex', justifyContent : 'center'}}>
                <div class="card" style = {{"width" : '50%'}}>
                    <div class="card-body">
                       <table class = "table" columnGap = '5px'>
                           <tbody>
                                <tr>
                                   <td>
                                        <p class="card-text"><b>Order ID:</b></p>
                                   </td>
                                   <td>
                                        <input list="order_id" name="input_normal"/>
                                   </td>
                                </tr>
                                <tr>
                                   <td>
                                        <p class="card-text"><b>Customer:</b></p>
                                   </td>
                                   <td>
                                        <input list="order_id" name="input_normal"/>
                                   </td>
                                </tr>
                                <tr>
                                   <td>
                                        <p class="card-text"><b>Customer Status:</b></p>
                                   </td>
                                   <td>
                                        <input list="order_id" name="input_normal"/>
                                   </td>
                                </tr>
                                <tr>
                                   <td>
                                        <p class="card-text"><b>Order Date:</b></p>
                                   </td>
                                   <td>
                                        <input list="order_id" name="input_normal"/>
                                   </td>
                                </tr>
                                <tr>
                                   <td>
                                        <p class="card-text"><b>Expected Delivery:</b></p>
                                   </td>
                                   <td>
                                        <input list="order_id" name="input_normal"/>
                                   </td>
                                </tr>
                           </tbody>
                       </table>
                    </div>
                </div>

                <div class="card" style = {{"width" : '50%'}} >
                    <div class="card-body">
                       <table class = "table" columnGap = '5px'>
                           <tbody>
                                <tr>
                                   <td>
                                        <p class="card-text"><b>Billing Address:</b></p>
                                   </td>
                                   <td>
                                        <input list="order_id" name="input_normal"/>
                                   </td>
                                </tr>
                                <tr>
                                   <td>
                                        <p class="card-text"><b>Address 2:</b></p>
                                   </td>
                                   <td>
                                        <input list="order_id" name="input_normal"/>
                                   </td>
                                </tr>
                                <tr>
                                   <td>
                                        <p class="card-text"><b>City:</b></p>
                                   </td>
                                   <td>
                                        <input list="order_id" name="input_normal"/>
                                   </td>
                                </tr>
                                <tr>
                                   <td>
                                        <p class="card-text"><b>State:</b></p>
                                   </td>
                                   <td>
                                        <input list="order_id" name="input_normal"/>
                                   </td>
                                </tr>
                                <tr>
                                   <td>
                                        <p class="card-text"><b>Post Code:</b></p>
                                   </td>
                                   <td>
                                        <input list="order_id" name="input_normal"/>
                                   </td>
                                </tr>
                                <tr>
                                   <td>
                                        <p class="card-text"><b>Country:</b></p>
                                   </td>
                                   <td>
                                        <input list="order_id" name="input_normal"/>
                                   </td>
                                </tr>
                           </tbody>
                       </table>
                    </div>
                </div>
                <div class="card" style = {{"width" : '50%'}} >
                    <div class="card-body">
                       <table class = "table" columnGap = '5px'>
                           <tbody>
                                <tr>
                                   <td>
                                        <p class="card-text"><b>Shipping Address:</b></p>
                                   </td>
                                   <td>
                                        <input list="order_id" name="input_normal"/>
                                   </td>
                                </tr>
                                <tr>
                                   <td>
                                        <p class="card-text"><b>Address 2:</b></p>
                                   </td>
                                   <td>
                                        <input list="order_id" name="input_normal"/>
                                   </td>
                                </tr>
                                <tr>
                                   <td>
                                        <p class="card-text"><b>City:</b></p>
                                   </td>
                                   <td>
                                        <input list="order_id" name="input_normal"/>
                                   </td>
                                </tr>
                                <tr>
                                   <td>
                                        <p class="card-text"><b>State:</b></p>
                                   </td>
                                   <td>
                                        <input list="order_id" name="input_normal"/>
                                   </td>
                                </tr>
                                <tr>
                                   <td>
                                        <p class="card-text"><b>Post Code:</b></p>
                                   </td>
                                   <td>
                                        <input list="order_id" name="input_normal"/>
                                   </td>
                                </tr>
                                <tr>
                                   <td>
                                        <p class="card-text"><b>Country:</b></p>
                                   </td>
                                   <td>
                                        <input list="order_id" name="input_normal"/>
                                   </td>
                                </tr>
                                <tr>
                                    <td colSpan = "2">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                            <label class="form-check-label" for="flexCheckDefault">
                                                Same as billing?
                                            </label>
                                        </div>
                                   </td>
                                </tr>
                           </tbody>
                       </table>
                    </div>
                </div>
            </div>

            {/*<GridLayout className="layout" layout={layout} cols={2} rowHeight={100}>*/}
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
            {/*</GridLayout>*/}
        </div>
    )
}