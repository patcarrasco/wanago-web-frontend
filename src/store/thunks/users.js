import {loadUserList, loadFollowList, loadFollowingList} from '../actions/bottombar/userActions'


const ROOT_URL = process.env.REACT_APP_ROOT_URL

export const load_followers = () => dispatch => {
    console.log('getting followers')
    const id = localStorage.getItem('id')
    const url = ROOT_URL + `/users/${id}/followers`
    return fetch(url).then(res => res.json())
        .then(data => {
            console.log(data)
            dispatch(loadFollowList(data.followers))
        }
    )
}

export const load_following = () => dispatch => {
    console.log('getting following')
    const id = localStorage.getItem('id')
    const url = ROOT_URL + `/users/${id}/following`
    return fetch(url).then(res => res.json()).then(data => dispatch(loadFollowingList(data.following)))
}