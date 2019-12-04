import {
    LOAD_LIST_POSTER,
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
        case LOAD_LIST_POSTER + START: {
            if(!postersState[id])
                return {
                    ...postersState,
                    [id]: {
                        loading: true,
                        loaded: false,
                        error: '',
                        entity: {}
                    }
                }
            else
                return postersState
        }

        case LOAD_LIST_POSTER + SUCCESS: {
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
        }

        case LOAD_LIST_POSTER + FAIL: {
            return {
                ...postersState,
                [id]: {
                    loading: false,
                    loaded: false,
                    error: 'error occured',
                    entity: {}
                }
            }
        }
    }

    return postersState
}
