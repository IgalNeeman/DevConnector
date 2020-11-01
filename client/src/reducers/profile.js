//45 Profile Reducer & Get Current Profile -- 1.11.20

import { GET_PROFILE, PROFILE_ERROR } from "../actions/types";

const initalState ={
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
}

export default function(state = initalState, action) {

    const {type,payload}=action;
    switch(type){
        case GET_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            }
        case PROFILE_ERROR:
            return{
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state;
    }
}