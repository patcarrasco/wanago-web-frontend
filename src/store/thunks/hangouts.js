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
}

export const loadAllHangouts = () => dispatch => {
    const url = ROOT_URL + `/hangouts`
    return fetch(url)
        .then(res => res.json())
        .then(feed => {
            console.log('redux: loadAllHangouts, response succesfull')
            dispatch(loadFullHangouts(feed))
        })
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
}



