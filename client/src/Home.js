import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUserOnServer } from '../store';
import LoginForm from './Users/LoginForm';

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
    const { isLogged } = this.props;
    const { image } = this.state;
    return (
      <div className='jumbotron'>
        <h3 className='home-title'>Welcome to beta≈Together!</h3>
        {
          isLogged ? (
            <div className='image-upload'>
              <h4>Upload Today's Photo!</h4>
              <input type='file' onChange={addPhoto} />
              <button onClick={savePhoto} className='btn btn-primary'>submit image</button>
              {
                image ? (
                  <div>
                    <h4>Image Preview</h4>
                    <img src={image} />
                  </div>
                ) : null
              }
            </div>
          ) : (
            <div>
              <h5 className='home-title'>Please login or sign up to get started!</h5>
              <LoginForm />
            </div>
          )
        }
      </div>
    );
  }
}

const mapState = ({ user }) => {
  const isLogged = !!user.id
  return { user, isLogged }
}

const mapDispatch = (dispatch) => {
  return {
    updatePhoto: (user) => dispatch(updateUserOnServer(user))
  }
}

export default connect(mapState, mapDispatch)(Home);
