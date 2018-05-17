import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { updateUserOnServer, updateLoggedUser } from '../../store';

const GymCard = ({ user, gym, checkIn }) => {
  const { id, username, password } = user;
  return (
    <div>
      <Link to={`/gyms/${gym.id}`}>
        {gym.name}
      </Link>
      {
        user.gymId === gym.id ? (
          <button
            className='btn btn-warning'
            onClick={() => checkIn({ id, username, password, gymId: null })}
          >
            Check Out
          </button>
        ) : (
          <button
            className='btn btn-primary'
            onClick={() => checkIn({ id, username, password, gymId: gym.id })}
          >
            Check In
          </button>
        )
      }

    </div>
  );
}

const mapState = ({ user }, { gym }) => {
  return {
    user,
    gym
  }
}

const mapDispatch = (dispatch) => {
  return {
    checkIn: (user) => {
      dispatch(updateUserOnServer(user))
      dispatch(updateLoggedUser(user))
    }
  }
}

export default connect(mapState, mapDispatch)(GymCard);
