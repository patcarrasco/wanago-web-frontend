import {createStore, combineReducers, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
// import reducers here
import landingNavbar from './reducers/navbar'
import events from './reducers/events'

const rootReducer = combineReducers({
    landingNavbar: landingNavbar,
    events: events
})

const configureStore = () => (
    createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
)

export default configureStore