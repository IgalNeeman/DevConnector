import axios from 'axios';
import { setAlert} from './alert';

import {
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE
} from './types'

//45 Profile Reducer & Get Current Profile -- 1.11.20

//Get current users profile

export const getCurrentProfile = () => async dispatch =>{
    try {
        const res = await axios.get('/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// 48 Create or update profile 3-11-2021 
export  const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config ={
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post(`/api/profile`, formData, config);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
        dispatch(setAlert(edit? 'Profile Updated':'Profile Created','success'));
        if(!edit){
            history.push('/dashboard');
        }
    }
     catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
          errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

//PART 50 Add Education & Expreince

//Add Experience
export const addExperince = (formData,history)=> async dispatch =>{
    try {
        const config ={
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put(`/api/profile/experience`, formData, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert('Experince Added','success'));

            history.push('/dashboard');
        
    }
     catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
          errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

//Add Education
export const addEducation = (formData,history)=> async dispatch =>{
    try {
        const config ={
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put(`/api/profile/education`, formData, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert('Education Added','success'));

            history.push('/dashboard');
        
    }
     catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
          errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}