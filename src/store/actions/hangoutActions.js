import {LOAD_HANGOUTS, LOAD_ALL_HANGOUTS, CREATE_HANGOUT} from './actionTypes'
export const saveHangouts = (hangouts) => ({type: LOAD_HANGOUTS, payload: hangouts})
export const loadFullHangouts = (hangouts) => ({type: LOAD_ALL_HANGOUTS, payload: hangouts})
export const createHang = (bool) => ({type: CREATE_HANGOUT, payload: bool})

// create hangout doesnt need to be an acton?