import Client from 'predicthq'

const ACCESS_TOKEN = 'something'

let phq = new Client({access_token: ACCESS_TOKEN})

export const phqSearch = ({object}) => {
    phq.events.search(object)
    .then((res) => {
        for (let event of res) {
            console.log(event.title)
        }
    })  
}

