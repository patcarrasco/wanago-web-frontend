import {FEED_VENUE_CLICK} from '../actions/actionTypes'

const initState = {
    coords: {}
}

const reducer = (state = initState, action) => {
    switch(action.type) {
        case FEED_VENUE_CLICK:
            return {
                ...state,
                coords: action.payload
            }
        default:
            return state;
    }
}

export default reducer
