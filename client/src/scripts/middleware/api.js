import {START, SUCCESS, FAIL} from '../constants'

export default () => next => action => {
    const {callAPI, type, ...rest} = action

    if(!callAPI) return next(action)
    const {method} = callAPI

    next({
        ...rest, type: type + START
    })

    fetch(callAPI.url, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: method || 'GET',
        body: method == 'POST' ? JSON.stringify(callAPI.body) : null
    })
        .then(response => {
            if(response.status >= 400)
                throw new Error(response.statusText)

            return response.json()
        })
        .then(response => {
            next({
                ...rest,
                type: type + SUCCESS,
                payload: response
            })
        })
        .catch(error => next({
            ...rest,
            type: type + FAIL,
            payload: error.message
        }))
}
