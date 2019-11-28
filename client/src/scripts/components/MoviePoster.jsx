import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import makeSelectMoviePoster from '../selectors/movie-poster'
import {loadMoviePoster} from '../AC/index'
import Loader from './Loader'

class Poster extends Component {

    static propTypes = {
        isMini: PropTypes.bool,
        id: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]),
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
            id && loadMoviePoster(id)
    }

    getPosterPath = () => {
        const {loading, loaded, error, movie} = this.props

        if(error)
            return '/styles/images/not-found.svg'

        if(loading || !loaded)
            return '/styles/images/blank-3x2.png'

        if(movie && movie.poster_path)
            return `/tmdbimg/${movie.poster_path}`

        return '/styles/images/not-found.svg'
    }

    getMiniBody = () => {
        const {loading, loaded} = this.props

        if(loading || !loaded)
            return (
                <>
                    <div className='list-poster__img-box'>
                        <img
                            src='/styles/images/blank-3x2.png'
                            className='movie-img blank-img'
                        />
                    </div>
                    <div className='poster__loader-box'>
                        <Loader type='spinner'/>
                    </div>
                </>
            )

        return (
            <div className='list-poster__img-box'>
                <img src={this.getPosterPath()} />
            </div>
        )
    }

    getFullBody = () => {
        const {loading, loaded, movie, id} = this.props

        if(loading || !loaded)
            return (
                <div className='poster-box movie-poster'>
                    <img
                        src={this.getPosterPath()}
                        className='movie-img blank-img'
                    />
                    <div className='poster__loader-box'>
                        <Loader type='spinner'/>
                    </div>
                    <div className='poster__text-box'>
                        <span className='movie-poster__title'>
                            ...
                        </span>
                    </div>
                </div>
            )

        const {title, year} = movie

        return (
            <div className='poster-box movie-poster'>
                <Link to={`/movies/${id}`}>
                    <img
                        className='movie-img'
                        src={this.getPosterPath()}
                    />
                </Link>
                <div className='poster__text-box'>
                    <Link to={`/movies/${id}`}>
                        <span className='movie-poster__title'>
                            {title}
                        </span>
                    </Link>
                    <span className='movie-poster__year'>
                        {year}
                    </span>
                </div>
            </div>
        )
    }

    render() {
        if(this.props.isMini)
            return this.getMiniBody()
        else
            return this.getFullBody()
    }
}

const makeMapStateToProps = () => {
    const selectMoviePoster = makeSelectMoviePoster()

    return (state, props) =>
        selectMoviePoster(state, props)
}

export default connect(
    makeMapStateToProps,
    {loadMoviePoster}
)(Poster)
