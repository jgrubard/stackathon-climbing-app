import React from 'react';
import { Link } from 'react-router-dom';
// import LoginForm from './Users/LoginForm';
import { connect } from 'react-redux';
import { logout } from '../store';

const Nav = ({ user, isLogged, logout }) => {
  return (
    <div>
      <ul className='nav'>
        <li className='nav-item'>
          <Link to='/' className='nav-link'>Home</Link>
        </li>
        <li className='nav-item'>
          <Link to='/gyms' className='nav-link'>Gyms</Link>
        </li>
        {
          isLogged ? (
            <div>
              <button className='btn btn-secondary' onClick={logout}>
                Logout
              </button>
              <span>Welcome {user.username}!</span>
            </div>
          ) : (
            <div>
              <Link to='/login'>
                <button className='btn btn-secondary'>Login</button>
              </Link>
              <button className='btn btn-secondary'>Sign Up</button>
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
