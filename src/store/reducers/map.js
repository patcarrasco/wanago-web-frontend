import {FEED_VENUE_CLICK, LOAD_LOCAL_VENUES, SAVE_MAP_OBJECT, SET_ACTIVE_MARKER} from '../actions/actionTypes'

const initState = {
    coords: {},
    localVenues: false,
    map: null,
    activeMarker: null
}

const reducer = (state = initState, action) => {
    switch(action.type) {
        case FEED_VENUE_CLICK:
            return {
                ...state,
                coords: action.payload
            }
        case LOAD_LOCAL_VENUES:
            if (action.payload.venues.page.totalElements < 1) {
                return {...state, localVenues: []}
            }
            console.log(action.payload.venues._embedded.venues.length)
            let venues = action.payload.venues._embedded.venues.filter(ven => ven.upcomingEvents._total !== 0)
            console.log(venues.length)
            return {
                ...state,
                localVenues: venues.map(ven => (
                {
                    key: ven.id,
                    id: ven.id,
                    city: ven.city.name,
                    address: ven.address,
                    name: ven.name,
                    upcomingEvents: ven.upcomingEvents,
                    url: ven.url,
                    location: ven.location,
                    distance: ven.distance
                }))
            }
        case SAVE_MAP_OBJECT:
            return {
                ...state,
                map: action.payload
            }
        case SET_ACTIVE_MARKER:
            return {
                ...state,
                activeMarker: action.payload
            }
        default:
            return state;
    }
}

export default reducer
