import {TOGGLE_SAVED, SHOW_LOGIN, SHOW_SIGNUP, TOGGLE_FEED, TOGGLE_VENUE_INFO} from '../actions/actionTypes'

const initState = {
    showSignup: false,
    showLogin: false,
    showFeed: false,
    showVenue: false,
    showSaved: false
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
                showFeed: !state.showFeed,
                showVenue: false,
                showSaved: false
            }
        case TOGGLE_VENUE_INFO:
            return {
                ...state,
                showVenue: action.payload,
                showFeed: false,
                showSaved: false,

            }
        case TOGGLE_SAVED:
            return {
                ...state,
                showSaved: !state.showSaved,
                showFeed: false,
                showVenue: false
            }
        default:
            return state;
    }
}

export default reducer
