/* eslint-disable no-fallthrough */
// create, update, delete lists reducer
import {
    CREATE_LIST,
    UPDATE_LIST,
    DELETE_LIST,
    ADD_MOVIE_TO_LIST,
    REMOVE_MOVIE_FROM_LIST,
    START,
    SUCCESS,
    FAIL
} from '../constants'

const defaultItemState = {
    loading: false,
    loaded: false,
    error: '',
    entity: {}
}

const defaultState = {
    create: {...defaultItemState},
    update: {...defaultItemState},
    delete: {...defaultItemState},
    addMovie: {...defaultItemState},
    removeMovie: {...defaultItemState}
}

const listCUDreducer = (CUDState = defaultState, action) => {
    const {type} = action

    switch(type) {
        case CREATE_LIST + START:
        case CREATE_LIST + SUCCESS:
        case CREATE_LIST + FAIL:

        case UPDATE_LIST + START:
        case UPDATE_LIST + SUCCESS:
        case UPDATE_LIST + FAIL:

        case DELETE_LIST + START:
        case DELETE_LIST + SUCCESS:
        case DELETE_LIST + FAIL:

        case ADD_MOVIE_TO_LIST + START:
        case ADD_MOVIE_TO_LIST + SUCCESS:
        case ADD_MOVIE_TO_LIST + FAIL:

        case REMOVE_MOVIE_FROM_LIST + START:
        case REMOVE_MOVIE_FROM_LIST + SUCCESS:
        case REMOVE_MOVIE_FROM_LIST + FAIL:

            return makeListCUDState(CUDState, action)
    }

    return CUDState
}

export default listCUDreducer

/*
 * creates and returns a new reducer state
 * that corresponds to the given action
 */
const makeListCUDState = (CUDState, action) => {
    const {type, payload} = action
    const key = getItemKeyByType(type)

    // UPDATE_LIST_START => START
    const loadingType = type.split('_').pop()

    const getNewItemState = {
        START: () => ({...loadingStartState}),
        SUCCESS: getLoadingSuccessState,
        FAIL: getLoadingFailState
    }[loadingType]

    return {
        ...CUDState,
        [key]: getNewItemState(payload)
    }
}

const loadingStartState = {
    loaded: false,
    loading: true,
    error: '',
    entity: {}
}

const getLoadingSuccessState = payload => ({
    loaded: true,
    loading: false,
    error: '',
    entity: payload
})

const getLoadingFailState = payload => ({
    loaded: false,
    loading: false,
    entity: {},
    error: payload
})

/*
 * returns the key for item of CUDstate
 * object depending of the action type
 */
const getItemKeyByType = type => {
    // 'CLEATE_LIST_SUCCESS' => 'CREATE_LIST'
    const rawType = type.split('_').slice(0, -1).join('_')

    return {
        CREATE_LIST: 'create',
        UPDATE_LIST: 'update',
        DELETE_LIST: 'delete',
        ADD_MOVIE_TO_LIST: 'addMovie',
        REMOVE_MOVIE_FROM_LIST: 'removeMovie'
    }[rawType]
}
