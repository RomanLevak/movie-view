import {
    LOAD_MOVIES,
    START,
    SUCCESS,
    FAIL
} from '../constants'

import {filterMovies} from '../helpers'

const defaultState = {
    loading: false,
    loaded: false,
    error: '',
    entities: {},
    totalPages: 0
}

export default (moviesState = defaultState, action) => {
    const {type, payload} = action

    switch(type) {
        case LOAD_MOVIES + START:
            return {
                ...moviesState,
                loaded: false,
                loading: true,
                error: ''
            }

        case LOAD_MOVIES + SUCCESS: {
            let {results, total_pages} = payload
            let movies = filterMovies(results)
            // api maxiimal requested page allowed is 1000
            let totalPages = total_pages > 1000 ? 1000 : total_pages

            return {
                ...moviesState,
                loaded: true,
                loading: false,
                entities: movies,
                totalPages,
                error: ''
            }
        }

        case LOAD_MOVIES + FAIL:
            return {
                ...moviesState,
                loaded: false,
                loading: false,
                entities: {},
                totalPages: 0,
                error: payload
            }
    }

    return moviesState
}
