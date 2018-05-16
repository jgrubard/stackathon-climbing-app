import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { getUsersFromServer } from '../store';
import { connect } from 'react-redux';

import Nav from './Nav';
import Home from './Home';

class App extends Component {

  componentDidMount() {
    const { getUsers } = this.props;
    getUsers();
  }

  render() {
    return (
      <Router>
        <div>
          <Route component={Nav} />
          <Route exact path='/' component={Home} />
        </div>
      </Router>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    getUsers: () => dispatch(getUsersFromServer())
  }
}

export default connect(null, mapDispatch)(App);
