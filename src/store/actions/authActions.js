import {SIGN_IN, SIGN_UP} from './actionTypes'

export const signIn = (obj) => ({type: SIGN_IN, payload: obj})
export const signUp = (obj) => ({type: SIGN_UP, payload: obj})
