export const _signIn = (credentials) => dispatch => {
    const url = `http://localhost:3000/api/v1/login`
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
        })
}

export const _signUp = (credentials) => dispatch => {
    const url = 'http://localhost:3000/api/v1/users'
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


