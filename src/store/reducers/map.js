import {FEED_VENUE_CLICK, LOAD_LOCAL_VENUES} from '../actions/actionTypes'

const initState = {
    coords: {},
    localVenues: []
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
                    city: ven.city.name,
                    address: ven.address,
                    name: ven.name,
                    upcomingEvents: ven.upcomingEvents,
                    url: ven.url,
                    location: ven.location,
                    distance: ven.distance
                }))
            }
        default:
            return state;
    }
}

export default reducer
