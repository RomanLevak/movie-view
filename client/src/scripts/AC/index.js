import {
    API_KEY, LOAD_MOVIES,
    LOAD_MOVIE_INFO,
    SEARCH_MOVIE,
    SINGIN,
    SINGOUT,
    SINGUP,
    CHECKAUTH,
    START,
    SUCCESS,
    FAIL
} from '../constants'
import {filterMovies} from '../helpers.js'

export function loadMovies(filters) {
    const {page} = filters

    return dispatch => {
        dispatch({
            type: LOAD_MOVIES + START,
            payload: filters
        })

        let APIurl = ''

        if(filters.type == 'popular')
            APIurl = `/tmdbapi/movie/popular?api_key=${API_KEY}&page=${page}`
        else if(filters.genreID)
            APIurl = `/tmdbapi/discover/movie?api_key=${API_KEY}&page=${page}&with_genres=${filters.genreID}`

        fetch(APIurl)
            .then(response => {
                if(response.status >= 400)
                    throw new Error(response.statusText)

                return response.json()
            })
            .then(response => {
                const {results, total_pages} = response
                const movies = filterMovies(results) // removing needless data
                // api maxiimal requested page allowed is 1000
                const total = total_pages > 1000 ? 1000 : total_pages

                return dispatch({
                    type: LOAD_MOVIES + SUCCESS,
                    payload: {movies, total_pages: total}
                })
            })
            .catch(err =>
                dispatch({
                    type: LOAD_MOVIES + FAIL,
                    payload: err.message
                })
            )
    }
}

export function loadMovieInfo(id) {
    return dispatch => {
        dispatch({
            type: LOAD_MOVIE_INFO + START,
            payload: id
        })

        fetch(`/tmdbapi/movie/${id}?api_key=${API_KEY}`)
            .then(response => {
                if(response.status >= 400)
                    throw new Error(response.statusText)

                return response.json()
            })
            .then(response =>
                dispatch({
                    type: LOAD_MOVIE_INFO + SUCCESS,
                    payload: response
                })
            )
            .catch(err => {
                dispatch({
                    type: LOAD_MOVIE_INFO + FAIL,
                    payload: err.message
                })}
            )
    }
}

// temp is used tell the reducer that results must be saved in tempEntities
export function searchMovie(query, temp = false) {
    return dispatch => {
        dispatch({
            type: SEARCH_MOVIE + START,
            payload: {temp}
        })

        fetch(`/tmdbapi/search/movie?api_key=${API_KEY}&query=${query}`)
            .then(response => {
                if(response.status >= 400)
                    throw new Error(response.statusText)

                return response.json()
            })
            .then(response => {
                const {results} = response
                const movies = filterMovies(results)

                dispatch({
                    type: SEARCH_MOVIE + SUCCESS,
                    payload: {temp, movies}
                })
            })
            .catch(err =>
                dispatch({
                    type: SEARCH_MOVIE + FAIL,
                    payload: {err, temp}
                })
            )
    }
}

export function singIn(email, password) {
    return dispatch => {
        dispatch({
            type: SINGIN + START,
        })

        fetch('/server/login', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({email, password})
        })
            .then(res => res.json())
            .then(res => {
                if(!res.user)
                    throw new Error(res.message)

                dispatch({
                    type: SINGIN + SUCCESS,
                    payload: res.user
                })
            })
            .catch(err => {
                dispatch({
                    type: SINGIN + FAIL,
                    payload: err.message
                })
            })
    }
}

export function singUp(email, password) {
    return dispatch => {
        dispatch({
            type: SINGUP + START,
        })

        fetch('/server/register', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({email, password})
        })
            .then(res => res.json())
            .then(res => {
                if(!res.user)
                    throw new Error(res.message)

                dispatch({
                    type: SINGUP + SUCCESS,
                    payload: res.user
                })
            })
            .catch(err => {
                dispatch({
                    type: SINGUP + FAIL,
                    payload: err.message
                })
            })
    }
}
export function singOut() {
    return dispatch => {
        dispatch({
            type: SINGOUT + START
        })

        fetch('/server/logout', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST'
        })
            .then(res => res.json())
            .then(res => {
                if(res.user !== false)
                    throw new Error(res.message)

                dispatch({
                    type: SINGOUT + SUCCESS,
                    payload: res.message
                })
            })
            .catch(err => {
                dispatch({
                    type: SINGOUT + FAIL,
                    payload: err.message
                })
            })
    }
}

export function checkIfSingedIn() {
    return dispatch => {
        dispatch({
            type: CHECKAUTH + START
        })

        fetch('/server', {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(res => {
                if(!res.user)
                    throw new Error(res.message)
                dispatch({
                    type: CHECKAUTH + SUCCESS,
                    payload: res.user
                })
            })
            .catch(err => {
                dispatch({
                    type: CHECKAUTH + FAIL,
                    payload: err.message
                })
            })
    }
}
