// create, update, delete lists reducer
import {
    CREATE_LIST,
    ADD_MOVIE_TO_LIST,
    START,
    SUCCESS,
    FAIL,
    RESET
} from '../constants'

const defaultState = {
    create: {
        loading: false,
        loaded: false,
        error: '',
        entity: null
    },
    addMovie: {
        loading: false,
        loaded: false,
        error: '',
        entity: null
    }
}

export default (state = defaultState, action) => {
    const {type, payload} = action

    switch(type) {
        case CREATE_LIST + START:
            return {
                ...state,
                create: {
                    loaded: false,
                    loading: true,
                    error: '',
                    entity: null
                }
            }

        case CREATE_LIST + SUCCESS:
            return {
                ...state,
                create: {
                    loaded: true,
                    loading: false,
                    error: '',
                    entity: payload
                }
            }

        case CREATE_LIST + FAIL:
            return {
                ...state,
                create: {
                    loaded: false,
                    loading: false,
                    entity: null,
                    error: payload
                }
            }

        case CREATE_LIST + RESET:
            return {
                ...state,
                create: {
                    loaded: false,
                    loading: false,
                    entity: null,
                    error: ''
                }
            }

        case ADD_MOVIE_TO_LIST + START:
            return {
                ...state,
                addMovie: {
                    loaded: false,
                    loading: true,
                    error: '',
                    entity: null
                }
            }

        case ADD_MOVIE_TO_LIST + SUCCESS:
            return {
                ...state,
                addMovie: {
                    loaded: true,
                    loading: false,
                    error: '',
                    entity: payload
                }
            }

        case ADD_MOVIE_TO_LIST + FAIL:
            return {
                ...state,
                addMovie: {
                    loaded: false,
                    loading: false,
                    entity: null,
                    error: payload
                }
            }
    }

    return state
}
