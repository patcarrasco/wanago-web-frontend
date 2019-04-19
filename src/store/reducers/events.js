import {LOAD_SEARCH_EVENTS, LOAD_EVENTS_BY_LOCATION, LOAD_EVENT_DETAILS, LOAD_SAVED_EVENTS, RESET_SEARCH, SET_LOAD_STATUS} from '../actions/actionTypes'

const initState = {
    searchedEvents: [],
    eventsByLocation: [],
    selectedEvent: null,
    savedEvents: [],
    loading: false
}

const reducer = (state = initState, action) => {
    switch(action.type) {
        case LOAD_SEARCH_EVENTS:
            return {
                ...state,
                searchedEvents: action.payload.events._embedded.events.map(e => {
                    return {
                        key: e.id,
                        name: e.name,
                        dates: e.dates,
                        venues: e._embedded.venues,
                        attractions: e._embedded.attractions,
                        priceRanges: e.priceRanges,
                        url: e.url
                    }
                })
            }
        case LOAD_EVENTS_BY_LOCATION:
            return {
                ...state,
                eventsByLocation: action.payload.events._embedded.events.map(e => {
                    return {
                        key: e.id,
                        name: e.name,
                        dates: e.dates,
                        venues: e._embedded.venues,
                        attractions: e._embedded.attractions,
                        priceRanges: e.priceRanges,
                        url: e.url
                    }
                })
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
