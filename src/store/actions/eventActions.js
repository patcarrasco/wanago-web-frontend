// event action creator

import {LOAD_SEARCH_EVENTS, LOAD_EVENTS_BY_LOCATION, LOAD_EVENT_DETAILS, LOAD_SAVED_EVENTS, RESET_SEARCH, SET_LOAD_STATUS, SHOW_SEARCH_RESULTS, SAVE_EVENT} from './actionTypes'

export const loadSearchEvents = (events) => ({type: LOAD_SEARCH_EVENTS, payload: events})
export const loadEventsByLocation = (events) => ({type: LOAD_EVENTS_BY_LOCATION, payload: events})
export const loadEventDetails = (event) => ({type: LOAD_EVENT_DETAILS, payload: event })
export const loadSavedEvents = (events) => ({type: LOAD_SAVED_EVENTS, payload: events})
export const resetSearch = () => ({type: RESET_SEARCH})

// search actions
export const setLoadStatus = (bool) => ({type: SET_LOAD_STATUS, payload: bool})
export const showSearchResults = (bool) => ({type: SHOW_SEARCH_RESULTS, payload: bool})
