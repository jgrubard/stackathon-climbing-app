import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { getUsersFromServer, getGymsFromServer, getUserFromToken } from '../store';
import { connect } from 'react-redux';

import Nav from './Nav';
import Home from './Home';
import Gyms from './Gym/Gyms';
import LoginForm from './Users/LoginForm';

class App extends Component {

  componentDidMount() {
    const { getUsers, getGyms, getUser } = this.props;
    getUsers();
    getGyms();
    getUser();
  }

  render() {
    return (
      <Router>
        <div className='container'>
          <Route component={Nav} />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/gyms' component={Gyms} />
            <Route exact path='/login' component={LoginForm} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    getUser: () => {
      const token = window.localStorage.getItem('token')
      if (token) {
        dispatch(getUserFromToken(token))
      }
    },
    getUsers: () => dispatch(getUsersFromServer()),
    getGyms: () => dispatch(getGymsFromServer())
  }
}

export default connect(null, mapDispatch)(App);
