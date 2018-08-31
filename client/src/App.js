import React, { Component } from 'react';
import './App.css';
import Saved from "./pages/saved";
import Unsaved from "./pages/unsaved";
import Nav from "./components/partials/Nav";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component ={Unsaved}/>
            <Route exact path="/saved" component ={Saved}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
