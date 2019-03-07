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
            const {auth_token, uuid, id } = data
            localStorage.setItem('token', auth_token)
            localStorage.setItem('uuid', uuid)
            localStorage.setItem('id', id)
        }).catch(e => console.log('Error!', e))
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
            const {auth_token, uuid, id} = data
            localStorage.setItem('token', auth_token)
            localStorage.setItem('uuid', uuid)
            localStorage.setItem('id', id)
        })
}


