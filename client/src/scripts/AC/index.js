import {
    API_KEY,
    LOAD_MOVIES,
    LOAD_MOVIE_INFO,
    LOAD_MOVIE_POSTER,
    SEARCH_MOVIE,
    LOAD_LISTS,
    LOAD_LIST_INFO,
    LOAD_LIST_POSTER,
    SINGIN,
    SINGOUT,
    SINGUP,
    CHECKAUTH,
} from '../constants'

export function loadMovies(filters) {
    let url = ''

    if(!filters)
        return {
            type: LOAD_MOVIES,
            callAPI: {url: `/tmdbapi/movie/popular?api_key=${API_KEY}`}
        }

    const {page} = filters

    if(filters.genreID)
        url = `/tmdbapi/discover/movie?api_key=${API_KEY}&page=${page}&with_genres=${filters.genreID}`

    else
        url = `/tmdbapi/movie/popular?api_key=${API_KEY}&page=${page}`

    return {
        type: LOAD_MOVIES,
        callAPI: {url}
    }
}

export function loadMovieInfo(id) {
    return {
        type: LOAD_MOVIE_INFO,
        callAPI: {url: `/tmdbapi/movie/${id}?api_key=${API_KEY}`}
    }
}

export function loadMoviePoster(id) {
    return {
        type: LOAD_MOVIE_POSTER,
        id,
        callAPI: {url: `/tmdbapi/movie/${id}?api_key=${API_KEY}`},
    }
}

export function searchMovie(query, temp = false) {
    return {
        type: SEARCH_MOVIE,
        temp,
        callAPI: {url: `/tmdbapi/search/movie?api_key=${API_KEY}&query=${query}`}
    }
}

export function loadLists(filters = {}) {
    const {userId, page} = filters
    let url = ''

    if(userId)
        url = `/server/lists/${userId}`
    else
        url = `/server/lists/latest${page ? page : ''}`

    return {
        type: LOAD_LISTS,
        callAPI: {url}
    }
}

export function loadListInfo(id) {
    return {
        type: LOAD_LIST_INFO,
        id,
        callAPI: {
            url: `/server/lists/${id}`
        }
    }
}

export function loadListPoster(id) {
    return {
        type: LOAD_LIST_POSTER,
        id,
        callAPI: {
            url: `/server/lists/${id}`
        }
    }
}

export function singIn(email, password) {
    return {
        type: SINGIN,
        callAPI: {
            url: '/server/user/login',
            method: 'POST',
            body: {email, password}
        }
    }
}

export function singUp(email, username, password) {
    return {
        type: SINGUP,
        callAPI: {
            url: '/server/user/register',
            method: 'POST',
            body: {
                email,
                displayName: username,
                password
            }
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
