import {loadUserList, loadFollowList, loadFollowingList} from '../actions/bottombar/userActions'

export const load_followers = () => dispatch => {
    console.log('getting followers')
    const id = localStorage.getItem('id')
    const url = `http://localhost:3000/api/v1/users/${id}/followers`
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
    const url = `http://localhost:3000/api/v1/users/${id}/following`
    return fetch(url).then(res => res.json()).then(data => dispatch(loadFollowingList(data.following)))
}