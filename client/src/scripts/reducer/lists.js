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
    entities: {},
    totalPages: 0
}

export default (listsState = defaultState, action) => {
    const {type, payload} = action

    switch(type) {
        case LOAD_LISTS + START:
            return {
                loaded: false,
                loading: true,
                error: '',
                entities: {},
                totalPages: 0
            }

        case LOAD_LISTS + SUCCESS:
            return {
                loaded: true,
                loading: false,
                error: '',
                entities: payload.lists,
                totalPages: Math.ceil(payload.totalCount/12)
            }

        case LOAD_LISTS + FAIL:
            return {
                loaded: false,
                loading: true,
                entities: {},
                totalPages: 0,
                error: payload
            }
    }

    return listsState
}
