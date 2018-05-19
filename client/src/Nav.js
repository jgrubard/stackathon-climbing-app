import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../store';

const Nav = ({ user, isLogged, logout, requestCount }) => {
  return (
    <div>
      <ul className='nav'>
        <li className='nav-item'>
          <Link to='/' className='nav-link'>Home</Link>
        </li>
        <li className='nav-item'>
          <Link to='/gyms' className='nav-link'>Gyms</Link>
        </li>
        { isLogged ? (
            <li className='nav-item'>
              <Link to={`/users/${user.id}/requests`} className='nav-link'>
                Requests <span className='badge badge-primary'>{requestCount}</span>
              </Link>
            </li>
          ) : null
        }
        {
          isLogged ? (
            <li className='nav-item'>
              <button className='btn btn-secondary' onClick={logout}>
                Logout
              </button>
              <span>Welcome {user.username}!</span>
            </li>
          ) : (
            <li className='nav-item'>
              <Link to='/login'>
                <button className='btn btn-secondary'>Login</button>
              </Link>
              <button className='btn btn-secondary'>Sign Up</button>
            </li>
          )
        }

      </ul>
    </div>
  );
}

const mapState = ({ user, requests }) => {
  const requestCount = requests.reduce((memo, request) => {
    if(request.partnerId === user.id) {
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
