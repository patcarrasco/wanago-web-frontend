import {createStore, combineReducers, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
// import reducers here
import navbar from './reducers/navbar'
import events from './reducers/events'
import users from './reducers/users'
import hangouts from './reducers/hangouts'
import map from './reducers/map'
import venue from './reducers/venue'

const rootReducer = combineReducers({
    navbar: navbar,
    events: events,
    users: users,
    hangouts: hangouts,
    map: map,
    venue: venue
})

const configureStore = () => (
    createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
)

export default configureStore