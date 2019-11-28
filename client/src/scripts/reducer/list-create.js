import {
    CREATE_LIST,
    START,
    SUCCESS,
    FAIL,
    RESET
} from '../constants'

const defaultState = {
    loading: false,
    loaded: false,
    error: '',
    entity: null
}

export default (editedList = defaultState, action) => {
    const {type, payload} = action

    switch(type) {
        case CREATE_LIST + START:
            return {
                ...editedList,
                loaded: false,
                loading: true,
                error: '',
                entity: null
            }

        case CREATE_LIST + SUCCESS:
            return {
                ...editedList,
                loaded: true,
                loading: false,
                error: '',
                entity: payload
            }

        case CREATE_LIST + FAIL:
            return {
                ...editedList,
                loaded: false,
                loading: false,
                entity: null,
                error: payload
            }

        case CREATE_LIST + RESET:
            return {
                ...editedList,
                loaded: false,
                loading: false,
                entity: null,
                error: ''
            }

    }

    return editedList
}
