import {
    LOAD_LIST_INFO,
    START,
    SUCCESS,
    FAIL
} from '../constants'

const defaultState = {
    loading: false,
    loaded: false,
    error: '',
    entity: {}
}

export default (listInfo = defaultState, action) => {
    const {type, payload} = action

    switch(type) {
        case LOAD_LIST_INFO + START:
            return {
                ...listInfo,
                loaded: false,
                loading: true,
                error: '',
                entity: {}
            }

        case LOAD_LIST_INFO + SUCCESS:
            return {
                ...listInfo,
                loaded: true,
                loading: false,
                error: '',
                entity: {
                    ...payload,
                    author: payload.user
                }
            }

        case LOAD_LIST_INFO + FAIL:
            return {
                ...listInfo,
                loaded: false,
                loading: false,
                entity: {},
                error: payload
            }
    }

    return listInfo
}
