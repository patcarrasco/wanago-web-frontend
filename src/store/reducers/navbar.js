import {SHOW_LOGIN, SHOW_SIGNUP, TOGGLE_FEED} from '../actions/actionTypes'

const initState = {
    showSignup: false,
    showLogin: false,
    showFeed: false,
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
        case TOGGLE_FEED:
            return {
                ...state,
                showFeed: !state.showFeed
            }
        default:
            return state;
    }
}

export default reducer
