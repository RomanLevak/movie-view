import {
    LOAD_LISTS,
    START,
    SUCCESS,
    FAIL,
} from '../constants'

const defaultState = {
    loading: false,
    loaded: false,
    error: '',
    entities: [],
    totalPages: 0
}

export default (listsState = defaultState, action) => {
    const {type, payload} = action

    switch(type) {
        case LOAD_LISTS + START:
            return {
                ...listsState,
                loaded: false,
                loading: true,
                error: '',
                entities: [],
            }

        case LOAD_LISTS + SUCCESS: {
            let lists
            let totalPages

            if(Array.isArray(payload))
                lists = payload
            else {
                lists = payload.lists
                totalPages = payload.total_pages
            }

            return {
                ...listsState,
                loaded: true,
                loading: false,
                error: '',
                entities: lists,
                totalPages
            }
        }

        case LOAD_LISTS + FAIL:
            return {
                ...listsState,
                loaded: false,
                loading: true,
                entities: [],
                totalPages: 0,
                error: payload
            }
    }

    return listsState
}
