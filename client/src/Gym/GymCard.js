import React from 'react';
import { connect } from 'react-redux'

const GymCard = ({ gym }) => {
  return (
    <div>
      {gym.name}
      <button className='btn btn-primary'>Check In</button>
    </div>
  );
}

const mapState = (state, { gym }) => {
  return {
    gym
  }
}

const mapDispatch = (dispatch) => {
  return {
    // checkIn: () dispatch()
  }
}

export default connect(mapState, mapDispatch)(GymCard);
