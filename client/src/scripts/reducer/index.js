import {combineReducers} from 'redux'
import movies from './movies'
import movieInfo from './movie-info'
import search from './search'
import lists from './lists'
import user from './user'

export default combineReducers({
    movies,
    movieInfo,
    search,
    lists,
    user
})
