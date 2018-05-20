import React from 'react';
import { connect } from 'react-redux';
import { getRequestsFromServer, updateRequestOnServer } from '../../store';
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
                  <div className='row'>
                    <div className='col'>
                      <p>{request.date}</p>
                      <h5>Climber: {user.fullName}{ partner.id === user.id && ' (Self)' }</h5>
                      <p>
                        Bouldering Level: <span className='badge badge-info'>{user.boulder}</span>
                        <br />
                        Top Rope Level: <span className='badge badge-info'>{user.top}</span>
                        <br />
                        Lead Climbing Level: <span className='badge badge-info'>{user.lead}</span>
                      </p>
                      <p>Where you can find me: {user.location}</p>
                      {
                        request.declined === false ? (
                          <h4>Let's Climb!</h4>
                        ) : (
                          <div>
                            <button
                              className='btn btn-success'
                              onClick={() => {
                                answerRequest({ id, declined: false, date, userId, partnerId, gymId })
                                socket.emit('notify-accepted', partner.fullName)
                              }}
                            >
                              Accept
                            </button>
                            &nbsp;
                            <button className='btn btn-danger' onClick={() => answerRequest({ id, declined: true, date, userId, partnerId, gymId })}>Decline</button>
                          </div>
                        )
                      }

                    </div>
                    <div className='col'>
                      <img src={user.image} height='200px' width='auto' />
                    </div>
                  </div>
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
  }
}

export default connect(mapState, mapDispatch)(Requests);
