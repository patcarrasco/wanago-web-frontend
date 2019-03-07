import {LOAD_USERS, LOAD_FOLLOWS, LOAD_FOLLOWING, UNFOLLOW_USER, LOAD_POSITION} from '../actionTypes'

export const loadUserList = (users) => ({type: LOAD_USERS, payload: users })
export const loadFollowList = (list) => ({type: LOAD_FOLLOWS, payload: list})
export const loadFollowingList = (list) => ({type: LOAD_FOLLOWING, payload: list})
// probably dont need these below:
export const unfollowUser = (user) => ({type: UNFOLLOW_USER, payload: user})

export const loadPosition = (obj) => ({type: LOAD_POSITION, payload: obj})
