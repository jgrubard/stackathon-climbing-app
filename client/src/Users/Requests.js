import React from 'react';
import { connect } from 'react-redux';
import { getRequestsFromServer, updateRequestOnServer } from '../../store';
import moment from 'moment';
import socket from '../../socket';

const Requests = ({ users, ownRequests, activeRequests, answerRequest, notify }) => {
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
              const partner = users.find(user => request.partnerId === user.id)
              const { id, date, userId, partnerId, gymId } = request;
              return (
                <li key={user.id} className='list-group-item'>
                  <p>{request.date}</p>
                  <button
                    className='btn btn-success'
                    onClick={() => {
                      answerRequest({ id, declined: false, date, userId, partnerId, gymId })
                      // notify(partner.username);
                      socket.emit('send-notification', partner.username)
                    }}
                  >
                    Accept
                  </button>
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
    },
    // notify: (name) => {
    //   return new Notification('betaTogether :)', {
    //     body: `${name} has accepted your request`,
    //     icon: 'https://d30y9cdsu7xlg0.cloudfront.net/png/1629600-200.png'
    //   })
    // }
  }
}

export default connect(mapState, mapDispatch)(Requests);
