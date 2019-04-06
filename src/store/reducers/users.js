import {LOAD_FOLLOWING, LOAD_FOLLOWS, LOAD_USERS, LOAD_POSITION} from '../actions/actionTypes'

const initState = {
    following: [],
    followers: [],
    users: [],
    lat:0,
    lon:0,
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
        case LOAD_USERS:
            return {
                ...state,
                users: action.payload
            }
        default:
            return state;
    }
}

export default reducer