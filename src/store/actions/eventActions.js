// event action creator

import {LOAD_SPOTLIGHT_EVENTS} from './actionTypes'

export const loadSpotlightEvents = (events) => ({type: LOAD_SPOTLIGHT_EVENTS, payload: events})