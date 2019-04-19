// event action creator

import {LOAD_SEARCH_EVENTS, LOAD_EVENTS_BY_LOCATION, LOAD_EVENT_DETAILS, LOAD_SAVED_EVENTS, RESET_SEARCH, SET_LOAD_STATUS} from './actionTypes'

export const loadSearchEvents = (events) => ({type: LOAD_SEARCH_EVENTS, payload: events})
export const loadEventsByLocation = (events) => ({type: LOAD_EVENTS_BY_LOCATION, payload: events})
export const loadEventDetails = (event) => ({type: LOAD_EVENT_DETAILS, payload: event })
export const loadSavedEvents = (events) => ({type: LOAD_SAVED_EVENTS, payload: events})
export const resetSearch = () => ({type: RESET_SEARCH})
export const setLoadStatus = (bool) => ({type: SET_LOAD_STATUS, payload: bool})
// export const saveEvent = ()