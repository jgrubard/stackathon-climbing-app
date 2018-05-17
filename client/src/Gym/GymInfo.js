import React from 'react';
import { connect } from 'react-redux';
import { createRequestOnServer } from '../../store';

const GymInfo = ({ loggedUser, gym, checkedInUsers, createRequest }) => {
  return (
    <div>
      <h2>{ gym.name }</h2>
      <h3>Checked in Climbers:</h3>
      <ul className='list-group'>
        {
          checkedInUsers.map(user => (
            <li key={user.id} className='list-group-item'>
              {user.username} { user.id === loggedUser.id ? ' - This is you!' : null }
              <button
                className='btn btn-primary'
                onClick={() => createRequest({ userId: loggedUser.id, partnerId: user.id })}
              >send request</button>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

const mapState = ({ user, users, gyms }, { gymId }) => {
  const gym = gyms.length && gyms.find(gym => gym.id === gymId)
  const checkedInUsers = users.filter(user => user.gymId === gymId)
  const loggedUser = user;
  return {
    gym,
    checkedInUsers,
    loggedUser
  }
}

const mapDispatch = (dispatch) => {
  return {
    createRequest: (request) => dispatch(createRequestOnServer(request))
  }
}

export default connect(mapState, mapDispatch)(GymInfo);
