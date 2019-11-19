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
    entities: {}
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
                entities: {}
            }

        case LOAD_LISTS + SUCCESS: {
            const {lists} = payload

            return {
                ...listsState,
                loaded: true,
                loading: false,
                error: '',
                entities: arrToMap(lists)
            }
        }

        case LOAD_LISTS + FAIL:
            return {
                ...listsState,
                loaded: false,
                loading: true,
                entities: {},
                error: ''
            }
    }

    return listsState
}
