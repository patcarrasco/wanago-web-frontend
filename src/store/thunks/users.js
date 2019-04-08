import moment from 'moment'

import {loadUserList, loadFollowList, loadFollowingList, loadPosition} from '../actions/bottombar/userActions'
import {getVenuesByLocation} from '../thunks/map'
import {getEventsByLocation} from '../thunks/event'


const ROOT_URL = process.env.REACT_APP_ROOT_URL

export const load_followers = () => dispatch => {
    const id = localStorage.getItem('id')
    const url = ROOT_URL + `/users/${id}/followers`
    return fetch(url).then(res => res.json())
        .then(data => {
            dispatch(loadFollowList(data.followers))
        }
    )
}

export const load_following = () => dispatch => {
    const id = localStorage.getItem('id')
    const url = ROOT_URL + `/users/${id}/following`
    return fetch(url).then(res => res.json()).then(data => dispatch(loadFollowingList(data.following)))
}

// Used to limit api calls for these evens to 1
let localVenues = false, localEvents = false

export const loadPositional = () => dispatch => {
    navigator.geolocation.getCurrentPosition(pos => {
        const lat = pos.coords.latitude
        const lon = pos.coords.longitude
        dispatch(loadPosition({lat: lat, lon:lon}))
      
        if (!!!localStorage.getItem('localEvents') && !localEvents) {
            let start = moment()
            let end = start.clone().add(2, "week")
            const obj = {
                queryCat: '',
                latlong: `${lat},${lon}`,
                startDate: start.format(),
                endDate: end.format()
            }
            dispatch(getEventsByLocation(obj))
            localEvents = true
        }
        if (!!!localStorage.getItem('localVenues') && !localVenues) {
            const obj = {
                latlong: `${lat},${lon}`,
            }
            setTimeout(() => dispatch(getVenuesByLocation(obj)), 500)
            localVenues = true
        }

    }, (err) => console.log('There was an error grabing user location:', err),
    {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0
    })
}

export const loadUsers = () => dispatch => {
    const url = ROOT_URL + '/users'
    return fetch(url).then(res => res.json()).then(data => dispatch(loadUserList(data)))
}

export const followAUser = (uuid) => dispatch => {
    const id = localStorage.getItem('id')
    const url = ROOT_URL + `/users/${id}/following`
    return fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({data: {uuid: uuid}})
    })
}