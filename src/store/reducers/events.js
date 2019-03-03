import {LOAD_SPOTLIGHT_EVENTS, LOAD_EVENTS_BY_LOCATION, LOAD_EVENT_DETAILS} from '../actions/actionTypes'

const initState = {
    spotlightEvents: null,
    eventsByLocation: null,
    selectedEvent: null
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
        case LOAD_EVENT_DETAILS:
            return {
                ...state,
                selectedEvent: action.payload
            }
        default:
            return state;
    }
}

export default reducer
