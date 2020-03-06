import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

import Firebase from '../../resources/FireBase/firebase'

import { PasswordForgetLink } from '../PasswordForget';
import Signup from '../Signup'
class Login extends Component {
  state = {
    email: '',
    password: '',
    isAuth: false,
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleFormSubmit = async e => {
    const { email, password } = this.state;
    e.preventDefault();
    try {
      await Firebase.doSignInWithEmailAndPassword(email, password);
      this.setState({
        isAuth: true,
      });
    } catch (error) {
      console.log(error);
    }

  };

  render() {
    const { email, password, isAuth } = this.state;
    if (isAuth) {
      return <Redirect to='/' />;
    }
    return (
      <div>
        <h1>Login</h1>
        <form style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}onSubmit={this.handleFormSubmit}>
          <input
            name='email'
            onChange={this.handleChange}
            value={email}
            placeholder='email'
          />
          <input
            name='password'
            onChange={this.handleChange}
            value={password}
            placeholder='password'
          />
          <button type='submit'>Login</button>
        </form>
        <PasswordForgetLink />
        <Link  to="/signup">Dont have an account??</Link>
      </div>
    );
  }
}

export default Login;
