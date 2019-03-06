import {LOAD_HANGOUTS, LOAD_ALL_HANGOUTS} from './actionTypes'

export const saveHangouts = (hangouts) => ({type: LOAD_HANGOUTS, payload: hangouts})
export const loadFullHangouts = (hangouts) => ({type: LOAD_ALL_HANGOUTS, payload: hangouts})