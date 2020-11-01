//PART 41 - Load User & Set Auth Token
import axios from 'axios';
const setAuthToken = token => {
    if(token){
        axios.defaults.headers.common['x-auth-token'] = token;
    }
    else{
        delete axios.defaults.headers.common['x-auth-token'];
    }
}
export default setAuthToken;