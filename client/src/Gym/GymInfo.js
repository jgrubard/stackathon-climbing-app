import React from 'react';
import { connect } from 'react-redux';
import UserCard from '../Users/UserCard';

const GymInfo = ({ gym, checkedInUsers, ownRequests }) => {
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
                <UserCard request={request} partner={user} gym={gym} />
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
  const ownRequests = requests.filter(request => request.userId === user.id)
  return {
    gym,
    checkedInUsers,
    ownRequests
  }
}

export default connect(mapState)(GymInfo);
