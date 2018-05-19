import React from 'react';
import { connect } from 'react-redux';
import { getRequestsFromServer, updateRequestOnServer } from '../../store';

const Requests = ({ users, ownRequests, activeRequests, answerRequest }) => {
  return (
    <div>
      <h3>Requests</h3>
      {
        !activeRequests.length && <h5>You have no active requests</h5>
      }
      <ul className='list-group'>
        {
          ownRequests.map(request => {
            if (!request.declined) {
              const user = users.find(user => request.userId === user.id)
              const { id, date, userId, partnerId, gymId } = request;
              return (
                <li key={user.id} className='list-group-item'>
                  <button className='btn btn-success' onClick={() => answerRequest({ id, declined: false, date, userId, partnerId, gymId })}>Accept</button>
                  &nbsp;
                  <button className='btn btn-danger' onClick={() => answerRequest({ id, declined: true, date, userId, partnerId, gymId })}>Decline</button>
                  &nbsp;{user.username}
                  <img src={user.image} height='200px' width='auto' />
                </li>
              );
            }
          })
        }
      </ul>
    </div>
  );
}

const mapState = ({ users, requests }, { id }) => {
  const ownRequests = requests.filter(request => request.partnerId === id )
  const activeRequests = requests.filter(request => request.declined !== true )
  return { users, ownRequests, activeRequests, id }
}

const mapDispatch = (dispatch) => {
  return {
    answerRequest: (request) => {
      dispatch(updateRequestOnServer(request))
      setTimeout(() => {
        dispatch(getRequestsFromServer())
      }, 50)

    }
  }
}

export default connect(mapState, mapDispatch)(Requests);
