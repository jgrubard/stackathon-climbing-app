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
    this.savePhoto = this.savePhoto.bind(this);
  }

  addPhoto(ev) {
    const file = ev.target.files[0];
    const reader = new FileReader();
    let dataURL;
    reader.onload = () => {
      dataURL = reader.result;
      this.setState({ image: dataURL });
    }
    reader.readAsDataURL(file);
  }

  savePhoto(ev) {
    ev.preventDefault();
    const { user, updatePhoto } = this.props;
    const { image } = this.state;
    const { id, username, password } = user;
    updatePhoto({ id, username, password, image })
    this.setState({ image: ''})
  }

  render() {
    const { addPhoto, savePhoto } = this;
    console.log('user:', this.props.user)
    return (
      <div>
        <h3>Welcome to betaTogether</h3>
        <h4>Upload Today's Photo!</h4>
        <p>upload here</p>
          <input type='file' onChange={addPhoto} />
          <button onClick={savePhoto} className='btn btn-primary'>submit image</button>
          {
            this.state.image ? (
              <div>
                <h4>Image Preview</h4>
                <img src={this.state.image} />
              </div>
            ) : null
          }

      </div>
    );
  }
}

const mapState = ({ user }) => {
  return { user }
}

const mapDispatch = (dispatch) => {
  return {
    updatePhoto: (user) => dispatch(updateUserOnServer(user))
  }
}

export default connect(mapState, mapDispatch)(Home);
