import React, { Component } from 'react';
import { getUsersFromServer } from '../store';
import { connect } from 'react-redux';

class App extends Component {

  componentDidMount() {
    const { getUsers } = this.props;
    getUsers();
  }

  render() {
    return (
      <hr />
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    getUsers: () => dispatch(getUsersFromServer())
  }
}

export default connect(null, mapDispatch)(App);
