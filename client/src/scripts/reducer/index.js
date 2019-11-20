import {combineReducers} from 'redux'
import movies from './movies'
import movieInfo from './movie-info'
import moviePosters from './movie-posters'
import search from './search'
import lists from './lists'
import listInfo from './list-info'
import listPosters from './list-posters'
import user from './user'

export default combineReducers({
    movies,
    movieInfo,
    moviePosters,
    search,
    lists,
    listInfo,
    listPosters,
    user
})
