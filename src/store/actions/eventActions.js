// event action creator

import {LOAD_EVENTS} from './actionTypes'

export const loadEvents = (events) => ({type: LOAD_EVENTS, payload: events})