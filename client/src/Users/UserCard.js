import React from 'react';
import { connect } from 'react-redux';
import { updateRequestOnServer, deleteRequestOnServer } from '../../store';
import moment from 'moment';

const UserCard = ({ user, gym, request, partner, deleteRequest, createRequest }) => {
  return (
    <div>
      <p>
        Climber: {partner.username}{ partner.id === user.id && <b> - This is you!</b>}
        <br />
        Bouldering Level: {partner.boulder}
        <br />
        Top Rope Level: {partner.top}
        <br />
        Lead Climbing Level: {partner.lead}
      </p>
      {
        partner.id === user.id ? null : (
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
              onClick={() => createRequest({ userId: user.id, partnerId: partner.id, date: moment(Date.now()).format('dddd, MMMM Do YYYY, h:mm a'), gymId: gym.id })}
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
