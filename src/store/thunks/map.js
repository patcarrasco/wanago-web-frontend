import {loadLocalVenues} from '../actions/mapActions'

const ROOT_URL = process.env.REACT_APP_ROOT_URL

export const getVenuesByLocation = (query) => dispatch => {
    const url = ROOT_URL + '/venues/by_location'
    const params = {
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
        console.log(r)
        dispatch(loadLocalVenues(r))
    })
    .catch(console.error)
}