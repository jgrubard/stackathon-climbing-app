import React from 'react';
import { connect } from 'react-redux';

import GymCard from './GymCard';

const Gyms = ({ gyms }) => {
  return (
    <div>
      <ul>
        {
          gyms.map(gym => (
            <GymCard gym={gym} key={gym.id} />
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
