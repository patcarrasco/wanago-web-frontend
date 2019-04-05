import {loadUserList, loadFollowList, loadFollowingList, loadPosition} from '../actions/bottombar/userActions'


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

export const loadPositional = () => dispatch => {
    console.log('loading pos?')
    navigator.geolocation.getCurrentPosition(pos => {
        console.log(pos)
        dispatch(loadPosition({lat: pos.coords.latitude, lon:pos.coords.longitude}))
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