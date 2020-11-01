// PART 38 Alert Reducer Actions & Types

//import uuid from 'uuid';
import {v4 as uuid} from "uuid"; 

import { SET_ALERT , REMOVE_ALERT } from './types';
//cd client -> npm i uuid
export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
    const id = uuid(); //uuid.v4 זה קורס לי ככה
    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id }
    });
    setTimeout(()=>dispatch({ type: REMOVE_ALERT, payload: id }),timeout); //זה מה שמוחק את ההודעות שגיאה PASSWORD DONT MATCH
};