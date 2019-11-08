import {
    SINGIN, SINGOUT, SINGUP, CHECKAUTH,
    START, SUCCESS, FAIL
} from '../constants'

const defaultState = {
    isSingedIn: false,
    loading: false,
    entity: {},
    error: ''
}

export default (userState = defaultState, action) => {
    const {type, payload} = action

    switch(type) {
        case SINGIN + START:
            if(userState.isSingedIn)
                return {
                    ...userState,
                    error: 'you are already singed in'
                }
            return {
                ...userState,
                loading: true,
                entity: {},
                error: ''
            }

        case SINGIN + SUCCESS:
            return {
                ...userState,
                loading: false,
                isSingedIn: true,
                entity: payload.user,
                error: ''
            }

        case SINGIN + FAIL:
            return {
                ...userState,
                loading: false,
                isSingedIn: false,
                entity: {},
                error: payload
            }

        case SINGUP + START:
            if(userState.isSingedIn)
                return {
                    ...userState,
                    error: 'you are already isSingedIn in'
                }
            return {
                ...userState,
                loading: true,
                isSingedIn: false,
                entity: {},
                error: ''
            }

        case SINGUP + SUCCESS:
            return {
                ...userState,
                loading: false,
                isSingedIn: true,
                entity: payload.user,
                error: ''
            }

        case SINGUP + FAIL:
            return {
                ...userState,
                loading: false,
                isSingedIn: false,
                entity: {},
                error: payload
            }

        case SINGOUT + START:
            if(!userState.isSingedIn)
                return {
                    ...userState,
                    error: 'you are already isSingedIn out'
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
                isSingedIn: false,
                entity: {},
                error: ''
            }

        case SINGOUT + FAIL:
            return {
                ...userState,
                loading: false,
                isSingedIn: true,
                error: ''
            }

        case CHECKAUTH + START:
            return {
                ...userState,
                loading: true,
                isSingedIn: false,
                error: ''
            }

        case CHECKAUTH + SUCCESS:
            return {
                ...userState,
                loading: false,
                isSingedIn: true,
                entity: payload.user,
                error: ''
            }

        case CHECKAUTH + FAIL:
            return {
                ...userState,
                loading: false,
                isSingedIn: false,
                entity: {},
                error: payload
            }
    }

    return userState
}
