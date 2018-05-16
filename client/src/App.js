import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { getUsersFromServer, getGymsFromServer } from '../store';
import { connect } from 'react-redux';

import Nav from './Nav';
import Home from './Home';
import Gyms from './Gym/Gyms';

class App extends Component {

  componentDidMount() {
    const { getUsers, getGyms } = this.props;
    getUsers();
    getGyms();
  }

  render() {
    return (
      <Router>
        <div>
          <Route component={Nav} />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/gyms' component={Gyms} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    getUsers: () => dispatch(getUsersFromServer()),
    getGyms: () => dispatch(getGymsFromServer())
  }
}

export default connect(null, mapDispatch)(App);
