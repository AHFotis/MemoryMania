import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Home from "./pages/Home";
import "./App.css";


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
         <Home />
        </Route>
        <Route exact path="/game">
         <Home />
        </Route>
        <Route>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
