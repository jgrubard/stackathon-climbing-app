import React from 'react';
import { connect } from 'react-redux';
import { updateRequestOnServer, deleteRequestOnServer } from '../../store';
import moment from 'moment';

const GymInfo = ({ loggedUser, gym, checkedInUsers, createRequest, ownRequests, deleteRequest }) => {
  return (
    <div>
      <h2>{ gym.name }</h2>
      <h3>Checked in Climbers:</h3>
      <ul className='list-group'>
        {
          checkedInUsers.map(user => {
            const request = ownRequests.find(request => request.partnerId === user.id);
            return (
              <li key={user.id} className='list-group-item'>
                {
                  user.id === loggedUser.id ? null : (
                    request ? (
                      <button
                        className='btn btn-warning'
                        onClick={() => deleteRequest(request)}
                      >
                        delete request
                      </button>
                    ) : (
                      <button
                        className='btn btn-primary'
                        onClick={() => createRequest({ userId: loggedUser.id, partnerId: user.id, date: moment(Date.now()).format('dddd, MMMM Do YYYY, h:mm a'), gymId: gym.id })}
                      >
                        send request
                      </button>
                    )
                  )
                }
                &nbsp;{user.username}{ user.id === loggedUser.id && ' - This is you!'}
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}

const mapState = ({ user, users, gyms, requests }, { gymId }) => {
  const gym = gyms.length && gyms.find(gym => gym.id === gymId)
  const checkedInUsers = users.filter(user => user.gymId === gymId)
  const loggedUser = user;
  const ownRequests = requests.filter(request => request.userId === loggedUser.id)
  return {
    gym,
    checkedInUsers,
    loggedUser,
    ownRequests
  }
}

const mapDispatch = (dispatch) => {
  return {
    createRequest: (request) => dispatch(updateRequestOnServer(request)),
    deleteRequest: (request) => dispatch(deleteRequestOnServer(request))
  }
}

export default connect(mapState, mapDispatch)(GymInfo);
