// event action creator

import {LOAD_SPOTLIGHT_EVENTS, LOAD_EVENTS_BY_LOCATION, LOAD_EVENT_DETAILS} from './actionTypes'

export const loadSpotlightEvents = (events) => ({type: LOAD_SPOTLIGHT_EVENTS, payload: events})
export const loadEventsByLocation = (events) => ({type: LOAD_EVENTS_BY_LOCATION, payload: events})
export const loadEventDetails = (event) => ({type: LOAD_EVENT_DETAILS, payload: event })