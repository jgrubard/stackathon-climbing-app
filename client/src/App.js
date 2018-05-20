import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { getUsersFromServer, getGymsFromServer, getUserFromToken, getRequestsFromServer } from '../store';
import { connect } from 'react-redux';

import Nav from './Nav';
import Home from './Home';
import Gyms from './Gym/Gyms';
import GymInfo from './Gym/GymInfo';
import Requests from './Users/Requests';
import LoginForm from './Users/LoginForm';

class App extends Component {

  componentDidMount() {
    const { getUsers, getGyms, getUser, getRequests } = this.props;
    getUsers();
    getGyms();
    getUser();
    getRequests();
    location.hash = '/'
  }

  render() {
    return (
      <Router>
        <div>
          <Route component={Nav} />
          <div>
            <Switch>
              <Route exact path='/' component={Home} />
              <div className='container'>
                <Route exact path='/gyms' component={Gyms} />
                <Route exact path='/gyms/:id' component={({ match }) => <GymInfo gymId={ match.params.id * 1}/> } />
                <Route exact path='/users/:id/requests' component={({ match }) => <Requests id={ match.params.id * 1}/> } />
                <Route exact path='/login' component={LoginForm} />
              </div>
            </Switch>
          </div>
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
    getGyms: () => dispatch(getGymsFromServer()),
    getRequests: () => dispatch(getRequestsFromServer())
  }
}

export default connect(null, mapDispatch)(App);
