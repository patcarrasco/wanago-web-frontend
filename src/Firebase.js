import * as firebase from 'firebase'

const ROOT_URL = process.env.REACT_APP_ROOT_URL

fetch(ROOT_URL+'/firebase').then(res => res.json()).then(dat => {
    firebase.initializeApp(dat.key)
})

export default firebase
