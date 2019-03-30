import * as firebase from 'firebase'

(() => {
    const url = process.env.REACT_APP_ROOT_URL
    return fetch(url + '/firebase')
        .then(res => res.json())
        .then(dat => firebase.initializeApp(dat.key))
})()

export default firebase
