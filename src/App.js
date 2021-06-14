import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Home from "./pages/Home";
import Game from "./pages/Game";
import "./App.css";


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
         <Home />
        </Route>
        <Route exact path="/game">
         <Game />
        </Route>
        <Route>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
