
const ROOT_URL = process.env.REACT_APP_ROOT_URL

export const _signIn = (credentials) => dispatch => {
    const url = ROOT_URL + `/login`
    const {username, password} = credentials
    const creds = {
        user:{
            username: username,
            password: password,
        }
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
            // console.log('response', data)
            if (data.message === 'login failed') {
                return false
            } else {
                const {auth_token, uuid, id } = data
                localStorage.setItem('token', auth_token)
                localStorage.setItem('uuid', uuid)
                localStorage.setItem('id', id)
                return true
            }
        }).catch(console.error)
}

export const _signUp = (credentials) => dispatch => {
    const url = ROOT_URL + '/users'
    const {username, password} = credentials
    const creds = {
        user: {
            username: username,
            password: password,
        }
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
            if (data.message) {
                return {status: false, message: data.message}
            } else {
                const {auth_token, uuid, id} = data
                localStorage.setItem('token', auth_token)
                localStorage.setItem('uuid', uuid)
                localStorage.setItem('id', id)
                return {status: true}
            }
        })
        .catch(console.error)
}


