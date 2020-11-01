import { combineReducers } from 'redux';
// PART 37

//part 38 - Alert Reducers actions & types
import alert from './alert';
import auth from './auth';
import profile from './profile';

//export default combineReducers({}); // זה מה שמקסימיליאן כתב - והייתה  הודעת שגיאה בקונסול- אבל התוכנית עבדה
//index.js:1 Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.
//export default combineReducers; //אני החזרתי כאן אובייקט רגיל. 


//45 Profile Reducer & Get Current Profile -- 1.11.20
export default combineReducers({
    alert,
    auth,
    profile
});
