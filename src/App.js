import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LandingPage from './v2/Pages/LandingPage'
import { PrivateRoute } from './helpers/Routes/PrivateRoute';
import MainPage from './v2/Pages/MainPage';


const App = () => {
    return (
      <Router>
        <Switch>
            <PrivateRoute exact path="/home" component={MainPage} />
            <Route exact path="/" component={LandingPage} />
        </Switch>
      </Router>
    )
}

export default App;
