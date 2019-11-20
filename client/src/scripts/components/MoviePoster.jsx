import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import getMoviePoster from '../selectors/movie-poster'
import {loadMoviePoster} from '../AC/index'

class Poster extends Component {

    static propTypes = {
        isMini: PropTypes.bool,
        id: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]).isRequired,
        // from connect
        loading: PropTypes.bool.isRequired,
        loaded: PropTypes.bool.isRequired,
        movie: PropTypes.object,
        error: PropTypes.string,
        loadMoviePoster: PropTypes.func
    }

    componentDidMount() {
        const {id} = this.props
        const {loaded, loadMoviePoster, movie} = this.props

        if(!loaded || !movie)
            loadMoviePoster(id)
    }

    render() {
        const {loading, loaded, error, movie, id} = this.props

        let posterPath = ''

        if(error)
            posterPath = '/styles/images/not-found.svg'

        else if(loading || !loaded)
            return 'loading'

        else if(!movie.poster_path)
            posterPath = '/styles/images/not-found.svg'

        else
            posterPath = `/tmdbimg/${movie.poster_path}`

        if(this.props.isMini)
            return (
                <div className='list-poster__img-box'>
                    <img src={posterPath} />
                </div>
            )

        const {title, year} = movie

        return (
            <div className='poster-box movie-poster'>

                <Link to={`/movies/${id}`}>
                    <img src={posterPath} className='movie-img' />
                </Link>
                <div className='poster__text-box'>
                    <Link to={`/movies/${id}`}>
                        <span className='movie-poster__title'>{title}</span>
                    </Link>
                    <span className='movie-poster__year'>{year}</span>
                </div>
            </div>
        )
    }
}

export default connect(
    (state, ownProps) => getMoviePoster(state, ownProps.id),
    {loadMoviePoster}
)(Poster)
