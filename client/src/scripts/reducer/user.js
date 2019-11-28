import {
    SINGIN,
    SINGOUT,
    SINGUP,
    CHECKAUTH,
    START,
    SUCCESS,
    FAIL
} from '../constants'

const defaultState = {
    loading: false,
    entity: null,
    error: ''
}

export default (userState = defaultState, action) => {
    const {type, payload} = action

    switch(type) {
        case SINGIN + START:
            if(userState.entity)
                return {
                    ...userState,
                    error: 'you are already singed in'
                }
            return {
                ...userState,
                loading: true,
                entity: null,
                error: ''
            }

        case SINGIN + SUCCESS:
            return {
                ...userState,
                loading: false,
                entity: payload,
                error: ''
            }

        case SINGIN + FAIL:
            return {
                ...userState,
                loading: false,
                entity: null,
                error: payload
            }

        case SINGUP + START:
            if(userState.entity)
                return {
                    ...userState,
                    error: 'you are already isSingedIn in'
                }
            return {
                ...userState,
                loading: true,
                entity: null,
                error: ''
            }

        case SINGUP + SUCCESS:
            return {
                ...userState,
                loading: false,
                entity: payload,
                error: ''
            }

        case SINGUP + FAIL:
            return {
                ...userState,
                loading: false,
                isSingedIn: false,
                entity: null,
                error: payload
            }

        case SINGOUT + START:
            if(!userState.entity)
                return {
                    ...userState,
                    error: 'you are already singedIn out'
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
                entity: null,
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
                error: ''
            }

        case CHECKAUTH + SUCCESS: {
            const user = payload

            return {
                ...userState,
                loading: false,
                entity: user,
                error: ''
            }
        }

        case CHECKAUTH + FAIL:
            return {
                ...userState,
                loading: false,
                entity: null,
                error: payload
            }
    }

    return userState
}
