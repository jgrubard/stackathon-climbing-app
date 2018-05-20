import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { updateUserOnServer, updateLoggedUser, deleteRequestOnServer } from '../../store';

const GymCard = ({ user, gym, checkIn, checkOut, usersRequests }) => {
  const { id, username, password } = user;
  return (
    <div>
      <Link to={`/gyms/${gym.id}`}>
        {gym.name}
      </Link>
      <p>
        {gym.street}<br />{gym.city}<br />{gym.state}, {gym.zip}
      </p>
      {
        user.gymId === gym.id ? (
          <button
            className='btn btn-warning'
            onClick={() => checkOut({ id, username, password, gymId: null }, usersRequests)}
          >
            Check Out
          </button>
        ) : (
          <button
            className='btn btn-primary'
            onClick={() => checkIn({ id, username, password, gymId: gym.id }, gym)}
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
