import {LOAD_SPOTLIGHT_EVENTS, LOAD_EVENTS_BY_LOCATION, LOAD_EVENT_DETAILS, LOAD_SAVED_EVENTS, RESET_SEARCH, SET_LOAD_STATUS} from '../actions/actionTypes'

const initState = {
    spotlightEvents: [],
    eventsByLocation: [],
    selectedEvent: null,
    savedEvents: [],
    loading: false
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
        case LOAD_SAVED_EVENTS:
            return {
                ...state,
                savedEvents: action.payload
            }
        case RESET_SEARCH:
            return {
                ...state,
                eventsByLocation: []
            }
        case SET_LOAD_STATUS:
            return {
                ...state,
                loading: action.payload
            }
        default:
            return state;
    }
}

export default reducer
