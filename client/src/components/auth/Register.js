import React, { Fragment, useState } from 'react';
//PART 39 Alert Components & Action Call
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
// part 34 Register Form & useState Hook
// part 35 Requset Example & Login from {start with axios}
//import axios from 'axios';
import { Link , Redirect } from 'react-router-dom';
//impt - import prop types
//Typo in static class property declaration  react/no-typos
import PropTypes from 'prop-types';


const Register = ({ setAlert,register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const { name, email, password, password2 } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('passwords do not match', 'danger');
    } 
    else {
        //כל מה שבהערה - זה עבד אבל כתבתי את זה רק בשביל לבדוק שההרשמה מהדף של הריסטגר מגיע לדאטה בייס MONGODB
       //במקום למחוק את זה- שמתי בהערה - אבל בגדול הייתי צריך למחוק
       //כי אנחנו לא משתמשים בדרך הזאת ב REACT זה היה רק לצורך הדגמה הפונקציה הזאת
        //console.log('Success!'); 
       register({name,email,password});  //part 40
        /* const newUser = {
            name,email,password}
            try {
                const config = {
                    headers: {
                        'Content-Type':'application/json'
                }}
                const body = JSON.stringify(newUser);
                const res = await axios.post('/api/users', body, config);
                console.log(res.data);
            } 
            catch (err) {
               // console.error(err.response.data);
                
            }
        }*/
    }};
    
    if(isAuthenticated){
      return <Redirect to="/dashboard" />;
    }
  return (
    <Fragment>
      <h1 className='large text-primary'>Sing Up</h1>
      <p className='lead'>
        <i className='fas fa-user'>Create Your Account</i>
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={(e) => onChange(e)}
           // required
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
           // required
          />
          <small className='form-text'>
            This site uses Gravatar, so if you want a profile image, use a
            Gravatar email.
          </small>
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
         //   minLength='6'
            value={password}
            onChange={(e) => onChange(e)}
           // required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
          //  minLength='6'
            value={password2}
            onChange={(e) => onChange(e)}
           // required
          />
        </div>
        <input type='submit' value='Register' className='btn btn-primary' />
      </form>
      <p className='my-1'>
        Alredy have an account? <Link to='/login'>Sing in</Link>
      </p>
    </Fragment>
  )
}

//39
Register.propTypes = {
  setAlert: PropTypes.func.isRequired, //ptfr proptypes is required ...
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool, //ptb
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated, // its become from reducers auth.js
});


export default connect(mapStateToProps, {setAlert,register} )(Register);
