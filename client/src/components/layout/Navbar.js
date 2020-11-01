//racf
//Part 31-32 Clean Up & intial Components
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
//Part 43 - Logout & Navbar Links
import { connect } from 'react-redux';
import PropTypes from 'prop-types';  //impt
import { logout } from '../../actions/auth';
const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
        <li>
          <Link to="/dashboard">
          <i className="fas fa-user" />{' '}
          <span className="hide-sm">Dashboard</span></Link>
        </li>
        <li>
          <a onClick={logout} href='#!'>
            <i className="fas fa-sign-out-alt" />{' '}
            <span className="hide-sm">Logout</span></a>
        </li>
      </ul>
  );
  const guestLinks = (
    <ul>
        <li>
     <a href="#!">Developers</a>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
  );
  return (
    // התפריט הגיע מקובץ index.html שכתבתי בהתחלה

<nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code'></i> DevConnector
        </Link>
      </h1>
           { !loading  && (<Fragment>{ isAuthenticated ? authLinks : guestLinks } </Fragment>)}
    </nav>
  );
};
Navbar.propTypes = {
  logout: PropTypes.func.isRequired, //ptfr
  auth: PropTypes.object.isRequired //ptor
};
const mapStateToProps = state => ({
  auth: state.auth

});
export default connect(mapStateToProps, {logout} )(Navbar);
