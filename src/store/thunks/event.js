import {loadSpotlightEvents, loadEventsByLocation, loadSavedEvents, setLoadStatus} from '../actions/eventActions'

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
    console.log('started search query to ticketmaster')
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
    })
    .then(res => res.json())
    .then(r => {
        console.log('recieved events, passing results to dispatch')
        dispatch(setLoadStatus(false))
        dispatch(loadEventsByLocation(r))
    })
    .catch(e => console.log("ERROR: ", e))
}

export const getSavedEvents = () => dispatch => {
    const id = localStorage.getItem("id")
    const url = ROOT_URL + `/users/${id}/events`
    return fetch(url).then(res => res.json()).then(data => dispatch(loadSavedEvents(data)))
} 

export const addEvent = (params) => dispatch => {
    const id = localStorage.getItem("id")
    const url = ROOT_URL + `/users/${id}/events`
    console.log('adding event')
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({data:params})
    }).then(res => res.json()).then(console.log)
}

export const deleteEvent = (id) => dispatch => {
    const user_id = localStorage.getItem('id')
    const url = ROOT_URL + `/users/${user_id}/tickets`
    return fetch(url, {
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({event: id})
    }).then(res=> res.json()).then(()=>dispatch(getSavedEvents()))
}



