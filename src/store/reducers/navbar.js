import {SHOW_LOGIN, SHOW_SIGNUP} from '../actions/actionTypes'

const initState = {
    showSignup: false,
    showLogin: false,
    thing: 'booooo'
}

const reducer = (state = initState, action) => {
    switch(action.type) {
        case SHOW_LOGIN:
            return {
                ...state,
                showLogin: action.payload
            }
        case SHOW_SIGNUP:
            return {
                ...state,
                showSignup: action.payload
            }
        default:
            return state;
    }
}

export default reducer
