import {
    LOAD_MOVIE_POSTER,
    START,
    SUCCESS,
    FAIL
} from '../constants'

const defaultState = {
    /*
     * '290859': { // movieId
     *     loading: false,
     *     loaded: true,
     *     error: '',
     *     path: '/vqzNJRH4YyquRiWxCCOH0aXggHI.jpg'
     * }
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
                    path: ''
                }

            return {
                ...postersState,
                [id]: {
                    loading: true,
                    loaded: false,
                    error: '',
                    path: ''
                }
            }
        }

        case LOAD_MOVIE_POSTER + SUCCESS: {
            const {payload} = action
            const path = payload.poster_path

            return {
                ...postersState,
                [id]: {
                    loading: false,
                    loaded: true,
                    error: '',
                    path
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
                    path: ''
                }
            }
        }
    }

    return postersState
}
