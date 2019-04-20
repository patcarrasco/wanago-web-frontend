import {FEED_VENUE_CLICK, LOAD_LOCAL_VENUES, SAVE_MAP_OBJECT} from '../actions/actionTypes'

const initState = {
    coords: {},
    localVenues: [],
    map: null,
}

const reducer = (state = initState, action) => {
    switch(action.type) {
        case FEED_VENUE_CLICK:
            return {
                ...state,
                coords: action.payload
            }
        case LOAD_LOCAL_VENUES:
            let venues = action.payload.venues._embedded.venues.filter(ven => ven.upcomingEvents._total !== 0)
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
        default:
            return state;
    }
}

export default reducer
