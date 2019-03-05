import {LOAD_FOLLOWING, LOAD_FOLLOWS, LOAD_USERS} from '../actions/actionTypes'

const initState = {
    following: [],
    followers: [],
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
        default:
            return state;
    }
}

export default reducer