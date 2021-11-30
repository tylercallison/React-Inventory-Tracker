import React, { useState } from 'react'
import * as ReactBootStrap from "react-bootstrap"
import GridLayout from 'react-grid-layout';
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from '../components/DatePicker.js'
import { useFirebase } from '../components/FirestoreContext';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from "../assets/icetracklogo.png"
import Container from 'react-bootstrap/Container';


export default function OrderEntry() {
     const { getTestOrderEntryData, getTestOrderInfo, getTestBillInfo, getTestShippingInfo, firebaseSignOut } = useFirebase()
     const [rowElements, setRowElements] = React.useState([])
     const [orderInfo, setOrderInfoElements] = React.useState([])
     const [orderBillingInfo, setOrderBillingInfo] = React.useState([])
     const [orderShippingInfo, setOrderShippingInfo] = React.useState([])

     let rows = []
     let orderInfoCard = []
     let orderBillingCard = []
     let orderShippingCard = []

     React.useEffect(() => {
          genTable(getTestOrderEntryData(5))
          genOrderInfoCard(getTestOrderInfo())
          genOrderBillingCard(getTestBillInfo())
          genOrderShippingCard(getTestShippingInfo())
     }, [])

     function genTable(rowData) {
          rowData.map((data, key) => {
               rows.push(
                    <tr key={key}>
                         <td>{data.lineNumber}</td>
                         <td>
                              <input list="item_names" name="input_normal" defaultValue={data.itemName} />
                              <datalist id="item_names">
                                   <option value="Vanilla" />
                                   <option value="Chocolate" />
                                   <option value="Strawberry" />
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
                              <input defaultValue={data.quantity} />
                         </td>
                         <td>
                              <DatePicker initialDate={data.estDelivery} />
                         </td>
                         <td>{data.lineTotal}</td>
                    </tr>
               )
          })
          setRowElements(rows)
     }

     function genOrderInfoCard(orderInfoTable) {
          orderInfoTable.map((data, key) => {
               orderInfoCard.push(
                    <tbody key={key}>
                         <tr>
                              <td>
                                   <p class="card-text"><b>Order ID:</b></p>
                              </td>
                              <td>
                                   <input list="order_id" name="input_normal" value={data.orderId} />
                              </td>
                         </tr>
                         <tr>
                              <td>
                                   <p class="card-text"><b>Customer:</b></p>
                              </td>
                              <td>
                                   <input list="customer" name="input_normal" value={data.customer} />
                              </td>
                         </tr>
                         <tr>
                              <td>
                                   <p class="card-text"><b>Customer Status:</b></p>
                              </td>
                              <td>
                                   <input list="customerStatus" name="input_normal" value={data.customerStatus} />
                              </td>
                         </tr>
                         <tr>
                              <td>
                                   <p class="card-text"><b>Order Date:</b></p>
                              </td>
                              <td>
                                   <DatePicker initialDate={data.orderDate} />
                              </td>
                         </tr>
                         <tr>
                              <td>
                                   <p class="card-text"><b>Expected Delivery:</b></p>
                              </td>
                              <td>
                                   <DatePicker initialDate={data.expectedDelivery} />
                              </td>
                         </tr>
                    </tbody>
               )
          })
          setOrderInfoElements(orderInfoCard)
     }

     function genOrderBillingCard(orderInfoTable) {
          orderInfoTable.map((data, key) => {
               orderBillingCard.push(
                    <tbody key={key}>
                         <tr>
                              <td>
                                   <p class="card-text"><b>Billing Address:</b></p>
                              </td>
                              <td>
                                   <input list="order_id" name="input_normal" value={data.billAdr} />
                              </td>
                         </tr>
                         <tr>
                              <td>
                                   <p class="card-text"><b>Address 2:</b></p>
                              </td>
                              <td>
                                   <input list="order_id" name="input_normal" value={data.billAdr2} />
                              </td>
                         </tr>
                         <tr>
                              <td>
                                   <p class="card-text"><b>City:</b></p>
                              </td>
                              <td>
                                   <input list="order_id" name="input_normal" value={data.billCity} />
                              </td>
                         </tr>
                         <tr>
                              <td>
                                   <p class="card-text"><b>State:</b></p>
                              </td>
                              <td>
                                   <input list="order_id" name="input_normal" value={data.billState} />
                              </td>
                         </tr>
                         <tr>
                              <td>
                                   <p class="card-text"><b>Post Code:</b></p>
                              </td>
                              <td>
                                   <input list="order_id" name="input_normal" value={data.billPostCode} />
                              </td>
                         </tr>
                         <tr>
                              <td>
                                   <p class="card-text"><b>Country:</b></p>
                              </td>
                              <td>
                                   <input list="order_id" name="input_normal" value={data.billCountry} />
                              </td>
                         </tr>
                    </tbody>
               )
          })
          setOrderBillingInfo(orderBillingCard)
     }

     function genOrderShippingCard(orderInfoTable) {
          orderInfoTable.map((data, key) => {
               orderShippingCard.push(
                    <tbody key={key}>
                         <tr>
                              <td>
                                   <p class="card-text"><b>Shipping Address:</b></p>
                              </td>
                              <td>
                                   <input list="order_id" name="input_normal" value={data.shipAdr} />
                              </td>
                         </tr>
                         <tr>
                              <td>
                                   <p class="card-text"><b>Address 2:</b></p>
                              </td>
                              <td>
                                   <input list="order_id" name="input_normal" value={data.shipAdr2} />
                              </td>
                         </tr>
                         <tr>
                              <td>
                                   <p class="card-text"><b>City:</b></p>
                              </td>
                              <td>
                                   <input list="order_id" name="input_normal" value={data.shipCity} />
                              </td>
                         </tr>
                         <tr>
                              <td>
                                   <p class="card-text"><b>State:</b></p>
                              </td>
                              <td>
                                   <input list="order_id" name="input_normal" value={data.shipState} />
                              </td>
                         </tr>
                         <tr>
                              <td>
                                   <p class="card-text"><b>Post Code:</b></p>
                              </td>
                              <td>
                                   <input list="order_id" name="input_normal" value={data.shipPostCode} />
                              </td>
                         </tr>
                         <tr>
                              <td>
                                   <p class="card-text"><b>Country:</b></p>
                              </td>
                              <td>
                                   <input list="order_id" name="input_normal" value={data.shipCountry} />
                              </td>
                         </tr>
                         <tr>
                              <td colSpan="2">
                                   <div class="form-check">
                                        <input class="form-check-input" type="checkbox" checked={data.isBilling} id="flexCheckDefault" />
                                        <label class="form-check-label" for="flexCheckDefault">
                                             Same as billing?
                                        </label>
                                   </div>
                              </td>
                         </tr>
                    </tbody>
               )
          })
          setOrderShippingInfo(orderShippingCard)
     }



     const layout = [
          { i: 'orderTable', x: 0, y: 0, w: 1, h: 2 },
     ]

     const renderOrder = (order, index) => {
          return (
               <tr key={index}>
                    <td>{order.lineNumber}</td>
                    <td>
                         <input list="item_names" name="input_normal" defaultValue={order.itemName} />
                         <datalist id="item_names">
                              <option value="Vanilla" />
                              <option value="Chocolate" />
                              <option value="Strawberry" />
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
                         <input defaultValue={order.quantity} />
                    </td>
                    <td>
                         <DatePicker initialDate={order.estDelivery} />
                    </td>
                    <td>{order.lineTotal}</td>
               </tr>
          )
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

                                   {/* <NavDropdown title="Trouble Tickets" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Ticket Entry</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Ticket Management</NavDropdown.Item>
                            </NavDropdown> */}
                              </Nav>
                              <Nav>
                                   <Nav.Link href="newticket">New Trouble Ticket</Nav.Link>
                                   <Nav.Link onClick={(e) => firebaseSignOut()}>Sign Out</Nav.Link>
                              </Nav>
                         </Navbar.Collapse>
                    </Container>
               </Navbar>
               <div responsive="m" style={{ "display": 'flex', justifyContent: 'center' }}>
                    <div class="card" style={{ "width": '50%' }}>
                         <div class="card-body">
                              <table class="table" columnGap='5px'>
                                   {orderInfo}
                              </table>
                         </div>
                    </div>

                    <div class="card" style={{ "width": '50%' }} >
                         <div class="card-body">
                              <table class="table" columnGap='5px'>
                                   {orderBillingInfo}
                              </table>
                         </div>
                    </div>
                    <div class="card" style={{ "width": '50%' }} >
                         <div class="card-body">
                              <table class="table" columnGap='5px'>
                                   {orderShippingInfo}
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
                              {rowElements}
                         </tbody>
                    </ReactBootStrap.Table>
               </div>
               {/*</GridLayout>*/}
          </div>
     )
}