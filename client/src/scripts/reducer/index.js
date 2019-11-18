import {combineReducers} from 'redux'
import movies from './movies'
import movieInfo from './movie-info'
import search from './search'
import lists from './lists'
import listInfo from './list-info'
import posters from './posters'
import user from './user'

export default combineReducers({
    movies,
    movieInfo,
    search,
    lists,
    listInfo,
    posters,
    user
})
