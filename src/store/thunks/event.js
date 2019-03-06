import {loadSpotlightEvents, loadEventsByLocation} from '../actions/eventActions'

const ROOT_URL = process.env.REACT_APP_ROOT_URL

export const getSpotlightEvents = () => dispatch => {
    const url = ROOT_URL + '/spotlight'
    const params = {
        // parameters for spotlight search (will be universal)
        uuid: localStorage.getItem('uuid')
    }
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(params)
    }).then(res => res.json()).then(r => dispatch(loadSpotlightEvents(r))).catch(e => console.log("ERROR: ", e))
}

export const getEventsByLocation = (query) => dispatch => {
    const url = ROOT_URL + '/events/by_location'
    const params = {
        // parameters for spotlight search (will be universal)
        uuid: localStorage.getItem('uuid'),
        query: query
    }
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(params)
    }).then(res => res.json()).then(r => dispatch(loadEventsByLocation(r))).catch(e => console.log("ERROR: ", e))
}



