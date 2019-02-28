import {signIn, signUp} from '../actions/authActions'


export const _signIn = (credentials) => dispatch => {
    const url = `http://localhost:3000/api/v1/login`
    let token;
    const {username, password} = credentials
    const creds = {
        username: username,
        password: password,
    }
    return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(creds)
        })
        .then(res => res.json())
        .then(data => {
            console.log('data :>', data)
            token = data.auth_token
            localStorage.setItem('token', token)
        })
}


