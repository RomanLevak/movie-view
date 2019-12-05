import {
    LOAD_LIST,
    START,
    SUCCESS,
    FAIL
} from '../constants'

const defaultState = {
    /*
     * '290859': { // listId
     *     loading: false,
     *     loaded: true,
     *     error: '',
     *     entity: {}
     */
}

export default (postersState = defaultState, action) => {
    const {type, id, payload} = action

    switch(type) {
        case LOAD_LIST + START:
            return {
                ...postersState,
                [id]: {
                    loading: true,
                    loaded: false,
                    error: '',
                    entity: {}
                }
            }

        case LOAD_LIST + SUCCESS:
            return {
                ...postersState,
                [id]: {
                    loading: false,
                    loaded: true,
                    error: '',
                    entity: {
                        ...payload,
                        user: undefined,
                        author: {
                            id: payload.user.id,
                            name: payload.user.displayName
                        }
                    }
                }
            }

        case LOAD_LIST + FAIL:
            return {
                ...postersState,
                [id]: {
                    loading: false,
                    loaded: false,
                    error: payload,
                    entity: {}
                }
            }
    }

    return postersState
}
