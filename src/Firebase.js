import * as firebase from 'firebase'

let config = {
    apiKey: "AIzaSyCG25rRNhUNi7HVPinF85Nfq0jfR32FQ6U",
    authDomain: "evio-8e301.firebaseapp.com",
    databaseURL: "https://evio-8e301.firebaseio.com",
    projectId: "evio-8e301",
    storageBucket: "evio-8e301.appspot.com",
    messagingSenderId: "718346486333"
};

firebase.initializeApp(config)

export default firebase