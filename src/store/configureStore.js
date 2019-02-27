import {createStore, combineReducers, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
// import reducers here
import landingNavbar from './reducers/navbar'

const rootReducer = combineReducers({
    landingNavbar: landingNavbar
})

const configureStore = () => (
    createStore(rootReducer, composeWithDevTools(applyMiddleware()))
)

export default configureStore