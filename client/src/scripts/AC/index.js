import {
    API_KEY, LOAD_MOVIES,
    LOAD_MOVIE_INFO,
    SEARCH_MOVIE,
    SINGIN,
    SINGOUT,
    SINGUP,
    CHECKAUTH,
} from '../constants'

export function loadMovies(filters) {
    const {page} = filters
    let APIurl = ''

    if(filters.type == 'popular')
        APIurl = `/tmdbapi/movie/popular?api_key=${API_KEY}&page=${page}`
    else if(filters.genreID)
        APIurl = `/tmdbapi/discover/movie?api_key=${API_KEY}&page=${page}&with_genres=${filters.genreID}`

    return {
        type: LOAD_MOVIES,
        callAPI: {url: APIurl}
    }
}

export function loadMovieInfo(id) {
    return {
        type: LOAD_MOVIE_INFO,
        callAPI: {url: `/tmdbapi/movie/${id}?api_key=${API_KEY}`}
    }
}

export function searchMovie(query, temp = false) {
    return {
        type: SEARCH_MOVIE,
        temp,
        callAPI: {url: `/tmdbapi/search/movie?api_key=${API_KEY}&query=${query}`}
    }
}

export function singIn(email, password) {
    return {
        type: SINGIN,
        callAPI: {
            url: '/server/user/login',
            method: 'POST',
            body: JSON.stringify({email, password})
        }
    }
}

export function singUp(email, username, password) {
    return {
        type: SINGUP,
        callAPI: {
            url: '/server/user/register',
            method: 'POST',
            body: JSON.stringify({
                email,
                displayName: username,
                password
            })
        }
    }
}

export function singOut() {
    return {
        type: SINGOUT,
        callAPI: {
            url: '/server/user/logout',
            method: 'POST'
        }
    }
}

export function checkIfSingedIn() {
    return {
        type: CHECKAUTH,
        callAPI: {url: '/server/user/me'}
    }
}
