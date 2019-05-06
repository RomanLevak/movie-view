import {LOAD_MOVIE_INFO, START, SUCCESS, FAIL} from '../constants'

const defaultState = {
    loading: false,
	loaded: false,
	entity: {},
}

export default (movieInfo = defaultState, action) => {
    const {type, payload} = action
    
    switch(type) {

        case LOAD_MOVIE_INFO + START:
            return {
                ...movieInfo,
                loaded: false,
                loading: true
            }

        case LOAD_MOVIE_INFO + SUCCESS:
            return {
                ...movieInfo,
                loaded: true,
                loading: false,
                entity: payload
            }
    }

    return movieInfo
}