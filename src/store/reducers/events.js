import {LOAD_SPOTLIGHT_EVENTS, LOAD_EVENTS_BY_LOCATION} from '../actions/actionTypes'

const initState = {
    spotlightEvents: null,
    eventsByLocation: null
}

const reducer = (state = initState, action) => {
    switch(action.type) {
        case LOAD_SPOTLIGHT_EVENTS:
            return {
                ...state,
                spotlightEvents: action.payload.events
            }
        case LOAD_EVENTS_BY_LOCATION:
            return {
                ...state,
                eventsByLocation: action.payload.events
            }
        default:
            return state;
    }
}

export default reducer
