import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import './styles/index.css';
import { FirebaseProvider } from "./components/FirestoreContext";
import reportWebVitals from './reportWebVitals';

import App from "./screens/App.js";
import Test2 from "./screens/Test2.js";
import Test3 from "./screens/Test3.js";
import NewTicket from "./screens/newticket.js";

ReactDOM.render(

  <BrowserRouter>
    <FirebaseProvider>
      <Switch>
        <Route exact path="/" render={(props) => <App {...props} />} />
        <Route path="/test2" render={(props) => <Test2 {...props} />} />
        <Route path="/test3" render={(props) => <Test3 {...props} />} />
        <Route path="/newTicket" render={(props) => <NewTicket {...props} />} />
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
