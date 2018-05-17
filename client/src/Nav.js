import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './Users/LoginForm';
import { connect } from 'react-redux';
import { logout } from '../store';

const Nav = ({ user, isLogged, logout }) => {
  return (
    <div>
      Navigation
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/gyms'>Gyms</Link>
        </li>
        {
          !isLogged ? (
            <LoginForm />
          ) : (
            <div>
              <button className='btn btn-secondary' onClick={logout}>
                Logout
              </button>
              {user.username}
            </div>
          )
        }

      </ul>
    </div>
  );
}

const mapState = ({ user }) => {
  const isLogged = !!user.id
  return {
    user,
    isLogged
  }
}

const mapDispatch = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(mapState, mapDispatch)(Nav);
