//racf מביא לי את הפונקציה של ריאקט

//Part 31-32 Clean Up & intial Components
import React from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {

    if(isAuthenticated){
       return <Redirect to='/dashboard'/>;
    }

    return (
<section className="landing">
        <div className="dark-overlay">
            <div className="landing-inner">
                <h1 className="x-large">Developer Connector</h1>
            <p className="lead">Create developer profile/protfolio, share posts and get help from other Developers</p>
            <div className="button">
                <Link to="/register" className="btn btn-primary">Sing Up</Link>
                <Link to="/login" className="btn btn">Login</Link>
            </div>
            </div>
        </div>
    </section>
    )
}
Landing.propTypes = {
    isAuthenticated: PropTypes.bool,
}
const mapStateToProps = state =>({
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps)(Landing);

