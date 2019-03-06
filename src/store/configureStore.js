import {createStore, combineReducers, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
// import reducers here
import landingNavbar from './reducers/navbar'
import events from './reducers/events'
import users from './reducers/users'
import hangouts from './reducers/hangouts'

const rootReducer = combineReducers({
    landingNavbar: landingNavbar,
    events: events,
    users: users,
    hangouts: hangouts,
})

const configureStore = () => (
    createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
)

export default configureStore