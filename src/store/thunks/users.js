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
    .catch(console.error)
}

export const load_following = () => dispatch => {
    const id = localStorage.getItem('id')
    const url = ROOT_URL + `/users/${id}/following`
    return fetch(url).then(res => res.json()).then(data => dispatch(loadFollowingList(data.following))).catch(console.error)
}

// Used to limit api calls for these events to 1

function verifyLocalstorage(dispatch, lat, lon) {
    console.log('verify local storage')
    dispatch(loadPosition({lat: lat, lon:lon}))
    if (!!!localStorage.getItem('localEvents')) {
        let start = moment()
        let end = start.clone().add(2, "week")
        const obj = {
            queryCat: '',
            latlong: `${lat},${lon}`,
            startDate: start.format(),
            endDate: end.format()
        }
        dispatch(getEventsByLocation(obj))
    }
    if (!!!localStorage.getItem('localVenues')) {
        const obj = {
            latlong: `${lat},${lon}`,
        }
        setTimeout(() => dispatch(getVenuesByLocation(obj)), 1001)
    }
}

export const loadPositional = () => dispatch => {
    console.log('load position')
    navigator.geolocation.getCurrentPosition(pos => {
        const lat = pos.coords.latitude
        const lon = pos.coords.longitude
        verifyLocalstorage(dispatch, lat, lon)
    }, (err) => {
        const obj = {
            lat: 40.7128, 
            lon: -74.0060 
        }

        verifyLocalstorage(dispatch, obj.lat, obj.lon)

        switch(err) {
            case err.PERMISSION_DENIED:
                console.error('You must enable location services to use this app as intended. Location set as NYC.', err)
                break
            case err.POSITION_UNAVAILABLE:
                console.error('Cannot access your location. Location set as NYC', err)
                break
            case err.TIMEOUT:
                console.warn('Request for location timed out. Location set as NYC', err)
                break
            default:
                console.error("Location set as NYC. There was an error loading user position: ", err)
                break
        }
    },
    {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 30000,
    })
}

export const loadUsers = () => dispatch => {
    const url = ROOT_URL + '/users'
    return fetch(url).then(res => res.json()).then(data => dispatch(loadUserList(data))).catch(console.error)
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
    }).catch(console.error)
}