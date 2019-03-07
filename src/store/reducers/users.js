import {LOAD_FOLLOWING, LOAD_FOLLOWS, LOAD_USERS, LOAD_POSITION, RESET_SEARCH} from '../actions/actionTypes'

const initState = {
    following: [],
    followers: [],
    users: [],
    lat:0,
    long:0,
}

const reducer = (state = initState, action) => {
    switch(action.type) {
        case LOAD_FOLLOWING:
            return {
                ...state,
                following: action.payload
            }
        case LOAD_FOLLOWS:
            return {
                ...state,
                followers: action.payload
            }
        case LOAD_POSITION:
            return {
                ...state,
                lat: action.payload.lat,
                lon: action.payload.lon
            }
        case RESET_SEARCH:
            return {
                ...state,

            }
        default:
            return state;
    }
}

export default reducer