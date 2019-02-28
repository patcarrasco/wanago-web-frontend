// Event Thunk Creators

import {loadSpotlightEvents} from '../actions/eventActions'

export const getSpotlights = () => dispatch => {
    return fetch('http://localhost:3001')
}
