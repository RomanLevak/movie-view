import {combineReducers} from 'redux'
import movies from './movies'
import movieInfo from './movie-info'
import search from './search'

export default combineReducers({
	movies,
	movieInfo,
	search
})