import {loadSearchEvents, loadEventsByLocation, loadSavedEvents, setLoadStatus} from '../actions/eventActions'

const ROOT_URL = process.env.REACT_APP_ROOT_URL

export const searchForEvents = (query) => dispatch => {
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
        dispatch(setLoadStatus(false))
        dispatch(loadSearchEvents(r))
    })
    .catch(e => console.log("ERROR: ", e))
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
    })
    .then(res => res.json())
    .then(r => {
        dispatch(loadEventsByLocation(r))
    })
    .catch(e => console.log("ERROR: ", e))
}

export const getSavedEvents = () => dispatch => {
    console.log('getting events....')
    const id = localStorage.getItem("id")
    const url = ROOT_URL + `/users/${id}/events`
    return fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            dispatch(loadSavedEvents(data.events))
        })
} 

export const addEvent = (params) => dispatch => {
    const id = localStorage.getItem("id")
    const url = ROOT_URL + `/users/${id}/events`
    
    const obj = {
        user: {
            event_data : {
                name: params.name,
                date: params.dates.start.dateTime,
                url: params.url,
                id: params.id,
            }
        }
    }

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(obj)
    }).then(res => res.json()).then((resp) => {
        if (resp.status.includes("OK")) {
            dispatch(getSavedEvents())
        }
    })
}

export const deleteEvent = (id) => dispatch => {
    const user_id = localStorage.getItem('id')
    const url = ROOT_URL + `/users/${user_id}/events`

    const obj = {
        user: {
            event_data: {
                id: id
            }
        }
    }
    return fetch(url, {
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(obj)
    }).then(res=> res.json()).then(()=>dispatch(getSavedEvents()))
}



