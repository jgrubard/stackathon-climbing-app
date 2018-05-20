import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { updateUserOnServer, updateLoggedUser, deleteRequestOnServer } from '../../store';

const GymCard = ({ user, gym, checkIn, checkOut, usersRequests }) => {
  const { id, username, password, firstName, lastName, boulder, top, lead, location } = user;
  return (
    <div>
      {
        user.gymId === gym.id ? (
          <h4>
            <Link to={`/gyms/${gym.id}`}>
              {gym.name}
            </Link>
          </h4>
        ) : (
          <h4>{gym.name}</h4>
        )
      }
      <p>
        {gym.street}<br />{gym.city}<br />{gym.state}, {gym.zip}
      </p>
      {
        user.gymId === gym.id ? (
          <button
            className='btn btn-warning'
            onClick={() => checkOut({ id, username, password, firstName, lastName, boulder, top, lead, location, gymId: null }, usersRequests)}
          >
            Check Out
          </button>
        ) : (
          <button
            className='btn btn-primary'
            onClick={() => checkIn({  id, username, password, firstName, lastName, boulder, top, lead, location, gymId: gym.id }, gym)}
          >
            Check In
          </button>
        )
      }

    </div>
  );
}

const mapState = ({ user, requests }, { gym }) => {
  const usersRequests = requests.filter(request => user.id === request.userId || user.id === request.partnerId)
  return {
    user,
    gym,
    usersRequests
  }
}

const mapDispatch = (dispatch) => {
  return {
    checkIn: (user, gym) => {
      dispatch(updateUserOnServer(user))
      dispatch(updateLoggedUser(user))
      location.hash = `/gyms/${gym.id}`
    },
    checkOut: (user, requests) => {
      dispatch(updateUserOnServer(user))
      dispatch(updateLoggedUser(user))
      requests.forEach(request => {
        dispatch(deleteRequestOnServer(request))
      })
    }
  }
}

export default connect(mapState, mapDispatch)(GymCard);
