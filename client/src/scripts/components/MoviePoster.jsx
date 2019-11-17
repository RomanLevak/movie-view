import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {loadMoviePoster} from '../AC/index'

class Poster extends Component {

    static propTypes = {
        id: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]).isRequired,
        // from connect
        loading: PropTypes.bool,
        loaded: PropTypes.bool,
        movie: PropTypes.object,
        error: PropTypes.string,
        loadMoviePoster: PropTypes.func
    }

    componentDidMount() {
        const {id} = this.props
        const {loading, loaded, loadMoviePoster} = this.props

        if(!loaded || !loading)
            loadMoviePoster(id)
    }

    getBody = () => {
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

        const {title, year} = movie

        return (
            <>
                <Link to={`/movies/${id}`}>
                    <img src={posterPath} className='movie-img' />
                </Link>
                <div className='poster__text-box'>
                    <Link to={`/movies/${id}`}>
                        <span className='movie-poster__title'>{title}</span>
                    </Link>
                    <span className='movie-poster__year'>{year}</span>
                </div>
            </>
        )
    }

    render() {
        return (
            <div className='poster-box movie-poster'>
                {this.getBody()}
            </div>
        )
    }
}

export default connect(
    (state, ownProps) => {
        const {id} = ownProps

        if(!state.posters[id])
            return {
                loading: false,
                loaded: false,
                error: '',
                movie: {}
            }

        return {
            ...state.posters[id],
            movie: state.posters[id].entity
        }
    },
    {loadMoviePoster}
)(Poster)
