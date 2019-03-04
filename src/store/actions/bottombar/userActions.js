import {LOAD_USERS, LOAD_FOLLOW_LIST, FOLLOW_USER, UNFOLLOW_USER} from '../actionTypes'

export const LOAD_USERS_LIST = (users) => ({type: LOAD_USERS, payload: users })
export const LOAD_FOLLOW_LIST = (list) => ({type: LOAD_FOLLOW_LIST, payload: list})