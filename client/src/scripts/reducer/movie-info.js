import {LOAD_MOVIE_INFO, START, SUCCESS, FAIL} from '../constants'

const defaultState = {
    loading: false,
    loaded: false,
    error: '',
    entity: {}
}

export default (movieInfo = defaultState, action) => {
    const {type, payload} = action

    switch(type) {
        case LOAD_MOVIE_INFO + START:
            return {
                ...movieInfo,
                loaded: false,
                loading: true,
                error: '',
                entity: {}
            }

        case LOAD_MOVIE_INFO + SUCCESS:
            return {
                ...movieInfo,
                loaded: true,
                loading: false,
                error: '',
                entity: payload
            }

        case LOAD_MOVIE_INFO + FAIL:
            return {
                ...movieInfo,
                loaded: false,
                loading: false,
                entity: {},
                error: payload
            }
    }

    return movieInfo
}
