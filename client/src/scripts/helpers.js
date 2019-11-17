export function arrToMap(arr) {
    return arr.reduce((acc, item) => {
        acc[item.id] = item
        return acc
    }, {})
}

export function mapToArr(obj) {
    return Object.keys(obj).map(id => obj[id])
}

export function filterMovie(movie) {
    return {
        year: movie.release_date.substring(0, 4),
        poster_path: movie.poster_path,
        title: movie.title,
        genre_ids: movie.genre_ids,
        id: movie.id,
    }
}

// removing needless data from movie
export function filterMovies(movies) {
    const filtredMovies = movies.map(filterMovie)

    return arrToMap(filtredMovies)
}
