import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LandingPage from '../src/Pages/LandingPage'
import HomePage from './Pages/HomePage';
import { PrivateRoute } from './helpers/Routes/PrivateRoute';

class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
            <PrivateRoute exact path="/home" component={HomePage} />
            <Route exact path="/" component={LandingPage} />
        </Switch>
      </Router>
    )
  }
}

export default App;
