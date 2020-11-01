import React, { Fragment, useState } from 'react';
// part 34 Register Form & useState Hook
// part 35 Requset Example & Login from {start with axios}
//import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
//part 42 - user login
import { connect } from 'react-redux';
import PropTypes from 'prop-types'; //impt
import { login } from '../../actions/auth';
const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    //console.log('Success!');
    login(email, password);
  };

//Redirect if logged in
  if(isAuthenticated){
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user'>Sign Into Your Account</i>
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            minLength='6'
            value={password}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <input type='submit' value='Login' className='btn btn-primary' />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Sing Up</Link>
      </p>
    </Fragment>
  );
};
Login.propTypes = {
  login: PropTypes.func.isRequired, //ptfr
  isAuthenticated: PropTypes.bool //ptb
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated, // its become from reducers auth.js
});

export default connect(mapStateToProps, { login })(Login);
