import {saveHangouts, loadFullHangouts} from '../actions/hangoutActions'

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
    console.log('in redux loadAllHangouts')
    const url = ROOT_URL + `/hangouts`
    return fetch(url)
        .then(res => res.json())
        .then(feed => {
            console.log('redux: loadAllHangouts, response succesfull')
            dispatch(loadFullHangouts(feed))
        })
}


