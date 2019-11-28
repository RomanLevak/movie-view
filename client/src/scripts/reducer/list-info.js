import {
    LOAD_LIST_INFO,
    UPDATE_LIST,
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
        // falls through
        case UPDATE_LIST + START:
            return {
                ...listInfo,
                loaded: false,
                loading: true,
                error: '',
                entity: {}
            }

        case LOAD_LIST_INFO + SUCCESS:
        // falls through
        case UPDATE_LIST + SUCCESS:
            return {
                ...listInfo,
                loaded: true,
                loading: false,
                error: '',
                entity: {
                    ...payload,
                    author: {
                        id: payload.user.id,
                        name: payload.user.displayName
                    }
                }
            }

        case LOAD_LIST_INFO + FAIL:
        // falls through
        case UPDATE_LIST + FAIL:
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
