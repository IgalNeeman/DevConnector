import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
 //Part 39 - Alert Components & Action Call

//racfp - because we are using props types

const Alert = ({ alerts }) => 
alerts !== null && alerts.length > 0 && alerts.map(alert => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
    </div>

));

Alert.propTypes = {
    alerts: propTypes.array.isRequired //ptar
};
const mapStateToProps = state => ({
    alerts: state.alert
 });

export default connect(mapStateToProps)(Alert);
