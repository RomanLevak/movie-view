import {
    LOAD_MOVIE_POSTER,
    START,
    SUCCESS,
    FAIL
} from '../constants'
import {filterMovie} from '../helpers'

const defaultState = {
    /*
     * '290859': { // movieId
     *     loading: false,
     *     loaded: true,
     *     error: '',
     *     entity: {}
     *
     */
}

export default (postersState = defaultState, action) => {
    const {type, id} = action

    switch(type) {
        case LOAD_MOVIE_POSTER + START: {

            if(!postersState[id])
                postersState[id] = {
                    loading: true,
                    loaded: false,
                    error: '',
                    entity: {}
                }

            return {
                ...postersState,
                [id]: {
                    loading: true,
                    loaded: false,
                    error: '',
                    entity: {}
                }
            }
        }

        case LOAD_MOVIE_POSTER + SUCCESS: {
            const {payload} = action
            const movie = filterMovie(payload)

            return {
                ...postersState,
                [id]: {
                    loading: false,
                    loaded: true,
                    error: '',
                    entity: movie
                }
            }
        }

        case LOAD_MOVIE_POSTER + FAIL: {
            return {
                ...postersState,
                [id]: {
                    loading: false,
                    loaded: false,
                    error: '',
                    entity: {}
                }
            }
        }
    }

    return postersState
}
