import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import serverAPI from '../middleware/server-api'
import tmdbAPI from '../middleware/tmdb-api'
import reducer from '../reducer/index'

const enhancer = applyMiddleware(thunk, tmdbAPI, serverAPI)

const store = createStore(reducer, {}, enhancer)

// dev only
window.store = store

export default store
