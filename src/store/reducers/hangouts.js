import {LOAD_HANGOUTS, LOAD_ALL_HANGOUTS, CREATE_HANGOUT} from '../actions/actionTypes'

const initState = {
    myHangouts: [],
    hangouts: [],
    created: false
}

const reducer = (state = initState, action) => {
    switch(action.type) {
        case LOAD_HANGOUTS:
            return {
                ...state,
                myHangouts: action.payload.myHangouts
            }
        case LOAD_ALL_HANGOUTS:
            return {
                ...state,
                hangouts: action.payload.hangouts
            }
        case CREATE_HANGOUT:
            console.log('hangout created', action.payload)
            return {
                ...state,
                created: action.payload
            }
        default:
            return state;
    }
}

export default reducer

