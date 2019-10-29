import {SEARCH_MOVIE, START, SUCCESS, FAIL} from '../constants'

const defaultState = {
    loaded: false,
    loading: false,
    tempResults: {}, // used to show results under search input while typing
    entities: {},
    error: null
}

export default (searchState = defaultState, action) => {
    const {type, payload} = action

    if(!payload) return searchState

    const {temp, movies} = payload

    if(temp)    // concerns only tempResults
        switch(type) {
            case SEARCH_MOVIE + START:
                return {
                    ...searchState,
                    tempResults: {}
                }

            case SEARCH_MOVIE + SUCCESS:
                return {
                    ...searchState,
                    tempResults: movies
                }
        }

    switch(type) {
        case SEARCH_MOVIE + START:
            return {
                ...searchState,
                loaded: false,
                loading: true,
                entities: [],
                error: null
            }

        case SEARCH_MOVIE + SUCCESS:
            return {
                ...searchState,
                loaded: true,
                loading: false,
                entities: movies,
                error: null
            }

        case SEARCH_MOVIE + FAIL:
            return {
                ...searchState,
                loaded: false,
                loading: false,
                entities: [],
                error: payload.err
            }
    }

    return searchState
}
