import {SAVE_SELECTED_VENUE_INFO, SELECTED_VENUE} from '../actions/actionTypes'

export const saveSelectedVenueInfo = (data) => ({type: SAVE_SELECTED_VENUE_INFO, payload: data})
export const selectVenue = (venue) => ({type: SELECTED_VENUE, payload: venue})