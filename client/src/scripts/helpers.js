export function arrToMap(arr) {
    return arr.reduce((acc, item) => {
        acc[item.id] = item
        return acc
    }, {})
}

export function mapToArr(obj) {
    return Object.keys(obj).map(id => obj[id])
}

// removing needless data from movie
export function filterMovies(movies) {
    const filtredMovies = movies.map(el => ({
        year: el.release_date.substring(0, 4),
        poster_path: el.poster_path,
        title: el.title,
        genre_ids: el.genre_ids,
        id: el.id,
    }))

    return arrToMap(filtredMovies)
}
