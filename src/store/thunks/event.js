// Event Thunk Creators

import {loadEvents} from '../actions/eventActions'

export const getEvents = () => dispatch => (
    fetch('EVENT_API')
    .then(r => r.json())
    .then(res => dispatch(loadEvents(res)))
)
