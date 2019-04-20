import {saveHangouts, loadFullHangouts, createHang} from '../actions/hangoutActions'

const ROOT_URL = process.env.REACT_APP_ROOT_URL

export const loadHangouts = () => dispatch => {
    const id = localStorage.getItem('id')
    const url = ROOT_URL + `/users/${id}/hangouts`
    return fetch(url)
        .then(res => res.json())
        .then(feed => {
            dispatch(saveHangouts(feed))
        })
        .catch(console.error)
}

export const loadAllHangouts = () => dispatch => {
    const url = ROOT_URL + `/hangouts`
    return fetch(url)
        .then(res => res.json())
        .then(feed => {
            dispatch(loadFullHangouts(feed))
        })
        .catch(console.error)
}

export const createHangout = (eventInfo) => dispatch => {
    const user_id = localStorage.getItem('id')
    const data = {hangout: {...eventInfo, user_id: user_id}}
    const url = ROOT_URL + '/hangouts'
    return fetch(url, {
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(data => dispatch(createHang(data.created)))
        .catch(console.error)
}

export const addHangout = (hangoutInfo) => dispatch => {
    console.log('adding', hangoutInfo)
    const id = localStorage.getItem('id')
    const url = ROOT_URL + `/users/${id}/hangouts`
    return fetch(url, {
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({data: {hangout_id: hangoutInfo}})
    })
    .catch(console.error)
}



