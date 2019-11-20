import {
    LOAD_LISTS,
    START,
    SUCCESS,
    FAIL,
} from '../constants'

import {arrToMap} from '../helpers'

const defaultState = {
    loading: false,
    loaded: false,
    error: '',
    entities: {},
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
                entities: {},
            }

        case LOAD_LISTS + SUCCESS: {
            const {lists} = payload
            const totalPages = payload.total_pages

            return {
                ...listsState,
                loaded: true,
                loading: false,
                error: '',
                entities: arrToMap(lists),
                totalPages
            }
        }

        case LOAD_LISTS + FAIL:
            return {
                ...listsState,
                loaded: false,
                loading: true,
                entities: {},
                totalPages: 0,
                error: payload
            }
    }

    return listsState
}
