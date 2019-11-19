import {
    SEARCH_MOVIE,
    START,
    SUCCESS,
    FAIL
} from '../constants'

import {filterMovies} from '../helpers'

const defaultState = {
    loaded: false,
    loading: false,
    tempResults: {}, // used to show results under search input while typing
    entities: {},
    error: ''
}

export default (searchState = defaultState, action) => {
    const {type, temp, payload} = action

    if(!payload) return searchState

    if(temp)
        switch(type) {
            case SEARCH_MOVIE + START:
                return {
                    ...searchState,
                    tempResults: {}
                }

            case SEARCH_MOVIE + SUCCESS: {
                const {results} = payload
                const movies = filterMovies(results)

                return {
                    ...searchState,
                    tempResults: movies
                }
            }
        }

    switch(type) {
        case SEARCH_MOVIE + START:
            return {
                ...searchState,
                loaded: false,
                loading: true,
                entities: [],
                error: ''
            }

        case SEARCH_MOVIE + SUCCESS: {
            const {results} = payload
            const movies = filterMovies(results)

            return {
                ...searchState,
                loaded: true,
                loading: false,
                entities: movies,
                error: ''
            }
        }

        case SEARCH_MOVIE + FAIL:
            return {
                ...searchState,
                loaded: false,
                loading: false,
                entities: [],
                error: payload
            }
    }

    return searchState
}
