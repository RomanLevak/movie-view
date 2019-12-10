import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {mapToArr} from '../helpers'
import {searchMovie} from '../AC'
import {default as MoviePoster} from './posters/Movie'
import Loader from './Loader'

class Results extends Component {

    static propTypes = {
        query: PropTypes.string.isRequired,
        // form connect
        movies: PropTypes.array.isRequired,
        loading: PropTypes.bool.isRequired,
        loaded: PropTypes.bool.isRequired,
        error: PropTypes.string,
        searchMovie: PropTypes.func.isRequired
    }

    componentDidMount() {
        const {loaded, loading, query, searchMovie} = this.props

        if(!loading || !loaded)
            searchMovie(query)
    }

    render() {
        return (
            <div className='results-box'>
                <div className='results'>
                    <h2 className='results__title'>
                        Searh results for:
                        <span className='results__query'>
                            {' ' + this.props.query}
                        </span>
                    </h2>
                    <ul className='results-list'>
                        {this.getBody()}
                    </ul>
                </div>
            </div>
        )
    }

    getBody = () => {
        const {movies, loading, error} = this.props

        if(loading)
            return <Loader type='squares' />

        if(error)
            return <span className='error-msg'>{error}</span>
        // renders only first 18 elements
        return movies.slice(0, 18).map(movie =>
            <li className='results-list__item'
                key={movie.id}
            >
                <MoviePoster id={movie.id} />
            </li>
        )
    }
}

export default connect(
    state => ({
        movies: mapToArr(state.search.entities),
        loading: state.search.loading,
        loaded: state.search.loaded,
        error: state.search.error
    }),
    {searchMovie}
)(Results)
