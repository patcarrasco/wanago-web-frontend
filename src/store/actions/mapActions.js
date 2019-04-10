import {FEED_VENUE_CLICK, LOAD_LOCAL_VENUES, SAVE_MAP_OBJECT} from './actionTypes'

export const feedVenueClick = (coords) => ({type: FEED_VENUE_CLICK, payload: coords})
export const loadLocalVenues = (venues) => ({type: LOAD_LOCAL_VENUES, payload: venues})
export const saveMap = (map) => ({type: SAVE_MAP_OBJECT, payload: map})