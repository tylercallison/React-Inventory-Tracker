import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import './styles/index.css';
import { FirebaseProvider } from "./components/FirestoreContext";
import reportWebVitals from './reportWebVitals';

import App from "./screens/App.js";
import NewTicket from "./screens/NewTicket.js";
import TroubleTicketManagement from "./screens/TroubleTicketManagement";
import InventorySystem from "./screens/InventorySystem";
import Login from "./screens/Login";
import CreateAccount from "./screens/CreateAccount";

ReactDOM.render(

  <BrowserRouter>
    <FirebaseProvider>
      <Switch>
        <Route exact path="/" render={(props) => <App {...props} />} />
        <Route path="/troubleTicketManagement" render={(props) => <TroubleTicketManagement {...props} />} />
        <Route path="/newTicket" render={(props) => <NewTicket {...props} />} />
        <Route path="/inventory" render={(props) => <InventorySystem {...props} />} />
        <Route path="/login" render={(props) => <Login {...props} />} />
        <Route path="/createAccount" render={(props) => <CreateAccount {...props} />} />
        <Route render={() => <Redirect to="/" />} />
        {/*<Redirect from="/" to="/index" />*/}
      </Switch>
    </FirebaseProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
