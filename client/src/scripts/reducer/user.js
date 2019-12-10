import {
    SINGIN,
    SINGOUT,
    SINGUP,
    GET_CURRENT_USER,
    START,
    SUCCESS,
    FAIL
} from '../constants'

const defaultState = {
    loading: false,
    entity: {},
    error: ''
}

export default (userState = defaultState, action) => {
    const {type, payload} = action

    switch(type) {
        case SINGIN + START:
        // falls through
        case SINGUP + START:
        // falls through
        case GET_CURRENT_USER + START:
            return {
                ...userState,
                loading: true,
                entity: {},
                error: ''
            }

        case SINGIN + SUCCESS:
        // falls through
        case SINGUP + SUCCESS:
        // falls through
        case GET_CURRENT_USER + SUCCESS: {
            // if signed out, payload is null
            const user = payload || {}
            return {
                ...userState,
                loading: false,
                entity: user,
                error: ''
            }
        }
        case SINGIN + FAIL:
        // falls through
        case SINGUP + FAIL:
        // falls through
        case GET_CURRENT_USER + FAIL:
            return {
                ...userState,
                loading: false,
                entity: {},
                error: payload
            }

        case SINGOUT + START:
            if(!userState.entity)
                return {
                    ...userState,
                    error: 'you are not singed in'
                }
            return {
                ...userState,
                loading: true,
                error: ''
            }

        case SINGOUT + SUCCESS:
            return {
                ...userState,
                loading: false,
                entity: {},
                error: ''
            }

        case SINGOUT + FAIL:
            return {
                ...userState,
                loading: false,
                error: ''
            }
    }

    return userState
}
