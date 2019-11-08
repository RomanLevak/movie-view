import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import api from '../middleware/api'
import reducer from '../reducer/index'

const enhancer = applyMiddleware(thunk, api)

const store = createStore(reducer, {}, enhancer)

// dev only
window.store = store

export default store
