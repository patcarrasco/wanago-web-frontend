import {SHOW_LOGIN, SHOW_SIGNUP} from './actionTypes'

export const showLogin = (bool) => ({type: SHOW_LOGIN, payload: bool})
export const showSignup = (bool) => ({type: SHOW_SIGNUP, payload: bool})