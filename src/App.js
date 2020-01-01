import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./components/pages/HomePage";
import FormPage from "./components/pages/FormPage";
import ChartPage from "./components/pages/ChartPage";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <CssBaseline />

        <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/home" component={HomePage} />
            <Route exact path="/form" component={FormPage} />
            <Route exact path="/chart" component={ChartPage} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}
export default App;
