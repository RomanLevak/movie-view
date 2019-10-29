import {LOAD_MOVIES, START, SUCCESS, FAIL} from '../constants'

const defaultState = {
    loading: false,
    loaded: false,
    entities: {},
    filters: {popular: true}
}

export default (moviesState = defaultState, action) => {
    const {type, payload} = action

    switch(type) {

        case LOAD_MOVIES + START:
            return {
                ...moviesState,
                loaded: false,
                loading: true,
                error: null
            }

        case LOAD_MOVIES + SUCCESS:
            return {
                ...moviesState,
                loaded: true,
                loading: false,
                entities: payload.movies,
                total_pages: payload.total_pages,
                error: null
            }

        case LOAD_MOVIES + FAIL:
            return {
                ...moviesState,
                loaded: false,
                loading: false,
                entities: {},
                error: payload
            }
    }

    return moviesState
}
