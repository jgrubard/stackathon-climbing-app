import React from 'react';
import { connect } from 'react-redux';

const Requests = ({ users, ownRequests, id }) => {
  return (
    <div>
      <h3>Requests</h3>
      <ul className='list-group'>
        {
          ownRequests.map(request => {
            const user = users.find(user => request.userId === user.id)
            return (
              <li key={user.id} className='list-group-item'>
                <button className='btn btn-success'>Accept</button>
                &nbsp;
                <button className='btn btn-danger'>Reject</button>
                &nbsp;{user.username}
                <img src={user.image} height='200px' width='auto' />
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}

const mapState = ({ users, requests }, { id }) => {
  const ownRequests = requests.filter(request => request.partnerId === id )
  return { users, ownRequests, id }
}

export default connect(mapState)(Requests);
