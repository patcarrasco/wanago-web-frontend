import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LandingPage from './v1/Pages/LandingPage'
import HomePage from './v1/Pages/HomePage';
import { PrivateRoute } from './helpers/Routes/PrivateRoute';
import HomePageMap from './v1/Pages/HomePageMap';

class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
            <PrivateRoute exact path="/map" component={HomePageMap} />
            <PrivateRoute exact path="/home" component={HomePage} />
            <Route exact path="/" component={LandingPage} />
        </Switch>
      </Router>
    )
  }
}

export default App;
