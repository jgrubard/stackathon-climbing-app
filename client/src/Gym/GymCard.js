import React from 'react';
import { connect } from 'react-redux'

const GymCard = ({ gym }) => {
  return (
    <div>
      {gym.name}
    </div>
  );
}

const mapState = (state, { gym }) => {
  return {
    gym
  }
}

export default connect(mapState)(GymCard);
