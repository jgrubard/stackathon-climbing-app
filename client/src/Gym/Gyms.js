import React from 'react';
import { connect } from 'react-redux';

import GymCard from './GymCard';

const Gyms = ({ gyms }) => {
  return (
    <div>
      <ul className='list-group'>
        {
          gyms.map(gym => (
            <li key={gym.id} className='list-group-item'>
              <GymCard gym={gym} />
            </li>
          ))
        }
      </ul>
    </div>
  );
}

const mapState = ({ gyms }) => {
  return {
    gyms
  }
}

export default connect(mapState)(Gyms);
