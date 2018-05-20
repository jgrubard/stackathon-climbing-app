import React from 'react';
import { connect } from 'react-redux';
import { updateRequestOnServer, deleteRequestOnServer } from '../../store';
import moment from 'moment';
import socket from '../../socket';

const UserCard = ({ user, gym, request, partner, deleteRequest, createRequest }) => {
  return (
    <div>
      <h5>Climber: {partner.firstName} {partner.lastName}{ partner.id === user.id && ' (Self)' }</h5>
      <p>
        Bouldering Level: <span className='badge badge-info'>{partner.boulder}</span>
        <br />
        Top Rope Level: <span className='badge badge-info'>{partner.top}</span>
        <br />
        Lead Climbing Level: <span className='badge badge-info'>{partner.lead}</span>
      </p>
      {
        partner.id === user.id ? null : (
          request ? (
            <div>
              <button
                className='btn btn-warning'
                onClick={() => deleteRequest(request)}
              >
                delete request
              </button>
              { request.declined === false ? <h4>REQUEST ACCEPTED!</h4> : null }
            </div>
          ) : (
            <button
              className='btn btn-primary'
              onClick={() => {
                createRequest({ userId: user.id, partnerId: partner.id, date: moment(Date.now()).format('dddd, MMMM Do YYYY, h:mm a'), gymId: gym.id })
                socket.emit('notify-request', user.firstName)
              }}
            >
              send request
            </button>
          )
        )
      }
    </div>
  );
}

const mapState = ({ user }, { partner, request, gym }) => {
  return {
    user,
    partner,
    request,
    gym
  }
}

const mapDispatch = (dispatch) => {
  return {
    createRequest: (request) => dispatch(updateRequestOnServer(request)),
    deleteRequest: (request) => dispatch(deleteRequestOnServer(request))
  }
}

export default connect(mapState, mapDispatch)(UserCard);
