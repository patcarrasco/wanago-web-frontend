import {SHOW_LOGIN, SHOW_SIGNUP, TOGGLE_FEED, TOGGLE_VENUE_INFO, TOGGLE_SAVED} from './actionTypes'

export const showLogin = (bool) => ({type: SHOW_LOGIN, payload: bool})
export const showSignup = (bool) => ({type: SHOW_SIGNUP, payload: bool})
export const toggleFeed = () => ({type: TOGGLE_FEED})
export const toggleVenue = (bool) => ({type: TOGGLE_VENUE_INFO, payload: bool})
export const toggleSaved = (bool) => ({type: TOGGLE_SAVED, payload: bool})