import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUserOnServer } from '../store';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      image: ''
    }
    this.addPhoto = this.addPhoto.bind(this);
  }

  addPhoto(ev) {
    const file = ev.target.files[0];
    const reader = new FileReader();
    let dataURL;
    reader.onload = () => {
      dataURL = reader.result;
      this.setState({ image: dataURL })
    }
    reader.readAsDataURL(file);
  }

  savePhoto(ev) {
    ev.preventDefault();
  }

  render() {
    const { addPhoto, savePhoto } = this;
    console.log('STATE:', this.state)
    return (
      <div>
        <h3>Welcome to Climb with Me!</h3>
        <h4>Upload Today's Photo!</h4>
        <p>upload here</p>

          <input type='file' onChange={addPhoto} />
          <button onClick={savePhoto} className='btn btn-primary'>submit image</button>
          {
            this.state.image ? (
              <img src={this.state.image} />
            ) : (
              null
            )

          }

      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    updatePhoto: () => dispatch(updateUserOnServer())
  }
}

export default connect(null, mapDispatch)(Home);
