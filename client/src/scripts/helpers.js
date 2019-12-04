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

export function parseDate(rawDateString) {
    let result = new Date(Date.parse(rawDateString))
        .toLocaleString()

    // '3/4/2005' => '03/04/2005'
    result = result.replace(/(?<=(?:^|\/))(\b\d\b)/g, '0$1')

    return result.substring(0, 10)
}
