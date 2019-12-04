import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {mapToArr} from '../helpers'
import {searchMovie} from '../AC'

class Search extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    static propTypes = {
        // from connect
        movies: PropTypes.array.isRequired,
        searchMovie: PropTypes.func.isRequired
    }

    state = {
        value: '',
        isResultsOpen: false
    }

    onChange = e => {
        const {value} = e.target
        const {searchMovie} = this.props

        this.setState({
            value,
            isResultsOpen: true
        })

        if(!value)
            return this.onBlur()

        searchMovie(value, true)
    }

    // handles click on 'Enter' key
    onKeyPress = e => {
        const {history} = this.context.router
        const {value} = this.state

        if(e.key == 'Enter') {
            history.push(`/movies/search/${value}`)
            this.setState({isResultsOpen: false})
        }
    }

    onBlur = () => {
        // hide results
        this.setState({isResultsOpen: false})
    }

    onFocus = () => {
        // show results
        this.setState({isResultsOpen: true})
    }

    getResults = () => {
        if(!this.state.isResultsOpen)
            return null

        const {movies} = this.props

        return movies.slice(0, 6).map(movie =>
            <Link className = 'search__item'
                to = {`/movies/${movie.id}`}
                key = {movie.id}
                /*
                 * prevent from onBlur event which would
                 * hide a Link and redirection wouldn't happen
                 */
                onMouseDown = {e => e.preventDefault()}
                onClick = {() => this.onBlur()}
            >
                {movie.title}
                <span>{movie.year}</span>
            </Link>
        )
    }

    render() {
        const {value} = this.state

        return (
            <div className='search-box'>
                <div className='search__input-box'
                    onBlur = {this.onBlur}
                    onFocus = {this.onFocus}
                >
                    <input className='search__input'
                        onChange = {this.onChange}
                        onKeyPress = {this.onKeyPress}
                        value = {this.state.value}
                        placeholder='Find movies'
                    />
                    <Link className='search__btn btn-search flex-center'
                        to = {`/movies/search/${value}`}
                        onClick = {this.onBlur}
                    >
                        <span className='icon-search'></span>
                    </Link>
                    <div className='search__results-box'>
                        {this.getResults()}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        movies: mapToArr(state.search.tempResults),
    }),
    {searchMovie},
)(Search)
