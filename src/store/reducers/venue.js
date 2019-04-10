import {SAVE_SELECTED_VENUE_INFO, SELECTED_VENUE} from '../actions/actionTypes'

const initState = {
    venueEvents: null,
    selectedVenue: false
}

const reducer = (state = initState, action) => {
    switch(action.type) {
        case SAVE_SELECTED_VENUE_INFO: 
            return {
                ...state,
                venueEvents: action.payload.events._embedded.events
            }
        case SELECTED_VENUE:
            if (action.payload === false) {
                return {
                    venueEvents: null,
                    selectedVenue: false,
                }
            }
            return {
                ...state,
                selectedVenue: action.payload
            }
        default:
            return state;
    }
}

export default reducer