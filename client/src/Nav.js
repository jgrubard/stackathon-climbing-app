import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store';

const Nav = ({ user, isLogged, logout, requestCount }) => {
  return (
    <div>
      <div className="navbar navbar-expand-lg navbar-light bg-light">
        <div className='navbar-brand'>
          <Link to='/' className='nav-link nav-title'>beta≈Together</Link>
        </div>
        {
          isLogged ? (
            <div className='nav-item'>
              <Link to='/gyms' className='nav-link'>Gyms</Link>
            </div>
          ) : null
        }
        { isLogged ? (
            <div className='nav-item'>
              <Link to={`/users/${user.id}/requests`} className='nav-link'>
                Requests <span className='badge badge-secondary'>{requestCount}</span>
              </Link>
            </div>
          ) : null
        }
        {
          isLogged ? (
            <span className='nav-link'>Welcome, {user.firstName}</span>
          ) : null
        }
        {
          isLogged ? (
            <div className='nav-item'>
              <button className='btn btn-secondary' onClick={logout}>
                Logout
              </button>
            </div>
          ) : null
        }
      </div>
    </div>
  );
}

const mapState = ({ user, requests }) => {
  const requestCount = requests.reduce((memo, request) => {
    if (request.partnerId === user.id && !request.declined) {
      memo++;
    }
    return memo;
  }, 0)
  const isLogged = !!user.id
  return {
    user,
    isLogged,
    requestCount
  }
}

const mapDispatch = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(mapState, mapDispatch)(Nav);
