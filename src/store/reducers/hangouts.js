import {LOAD_HANGOUTS, LOAD_ALL_HANGOUTS} from '../actions/actionTypes'

const initState = {
    myHangouts: [],
    hangouts: []
}

const reducer = (state = initState, action) => {
    console.log('load success, in reducer with', action)
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
        default:
            return state;
    }
}

export default reducer

