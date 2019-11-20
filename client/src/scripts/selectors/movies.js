import {createSelector} from 'reselect'
import {mapToArr} from '../helpers'

const getMovies = state => state.movies

const selectMovies = createSelector(
    getMovies,
    movies => ({
        entities: mapToArr(movies.entities),
        loading: movies.loading,
        loaded: movies.loaded,
        error: movies.error,
        totalPages: movies.totalPages
    })
)

export default selectMovies
