import {saveSelectedVenueInfo} from '../actions/venueActions'

const ROOT_URL = process.env.REACT_APP_ROOT_URL

export const getVenueInformation = (venueId) => dispatch => {
    const params = {
        venue: {
            id: venueId
        }
    }

    fetch(ROOT_URL + '/venues/by_id', {
        method: "POST",
        headers : {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(params)
    })
    .then(res => res.json())
    .then(ven => {
        console.log('saving data to reducer....')
        dispatch(saveSelectedVenueInfo(ven))
    })
    .catch(console.error)
}