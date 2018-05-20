import React, { Component } from 'react';
import { connect } from 'react-redux';
import { attemptLogin } from '../../store';

class LoginForm extends Component {
  constructor() {
    super();
    this.state = { username: '', password: '' }
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(ev) {
    // const { attemptLogin } = this.props;
    ev.preventDefault();
    const { username, password } = this.state;
    this.props.attemptLogin({ username, password });
  }

  onChange(ev) {
    const change = {}
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }


  render() {
    const { onSubmit, onChange } = this;
    const { username, password } = this.state;
    return (
      <div className='row login-signup'>
        <div className='col' />
        <div className='col'>
          <input className='form-control input-sm' placeholder='username' name='username' value={username} onChange={onChange} />
          <input className='form-control mr-sm-2' placeholder='password' name='password' value={password} onChange={onChange} type='password' />
          <button className='btn btn-success' onClick={onSubmit}>Login</button>
          &nbsp; &nbsp;
          <button className='btn btn-success'>Sign Up</button>
        </div>
        <div className='col' />
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    attemptLogin: (credentials) => dispatch(attemptLogin(credentials))
  }
}

export default connect(null, mapDispatch)(LoginForm);
