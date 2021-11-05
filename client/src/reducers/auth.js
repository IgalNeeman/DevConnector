//PART 40 -Auto Reducer & Register Action (Register Success\fail)
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    ACCOUNT_DELETED
} from '../actions/types';  
const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    //loading הוא בעצם כמו OnReadyStatemate של xmlhttprequest בודק שהבקשה הגיעה במלואה עד הסוף
    user: null
}
export default function(state = initialState, action){
    const { type, payload } = action;
    switch(type){
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        case REGISTER_SUCCESS: // אם זה הצליח יאוחסן ה טוקן ב LOCALSTORAGE..
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false // זה בדיוק מה שאמרתי, אם ה טוקן הגיע סבבה, הוא יחזיר אובייקט ויפסיק את הטעינה של הטוקן
            };
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
        case ACCOUNT_DELETED:
            localStorage.removeItem('token'); 
            //אם זה לא הצליח יימחק הטוקן 
            return{
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            };

        default:
            return state;

    }
}