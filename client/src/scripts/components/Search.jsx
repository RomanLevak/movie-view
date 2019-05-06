import React, {Component} from 'react'
import {searchMovie} from '../AC'
import {connect} from 'react-redux'
import {mapToArr} from '../helpers'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

class Search extends Component {

    static contextTypes = {
		router: PropTypes.object
	}

    static propTypes = {
        //from connect
        movies: PropTypes.array,
        searchMovie: PropTypes.func.isRequired
    }

    state = {
        value: '',
        isResultsOpen: false
    }

    onChange = (event) => {
        const {value} = event.target
        const {searchMovie} = this.props
        //inputing will open the search results
        this.setState({value, isResultsOpen: true})
        searchMovie(value, true)
    }

    onLinkClick = () => {
        //navigating to movie by link will hide results
        this.setState({isResultsOpen: false})
    }
    
    onBlur = () => {
        //hide results
        this.setState({isResultsOpen: false})
    }

    onFocus = () => {
        //show results
        this.setState({isResultsOpen: true})
    }

    //handles click on 'Enter' key
    onKeyPress = e => {
        const {history} = this.context.router
        const {value} = this.state

        if(e.key == 'Enter') {
            history.push(`/movies/search/${value}`)
            this.setState({isResultsOpen: false})
        }
    }

    getResults = () => {
        if(!this.state.isResultsOpen) return null
        const {movies} = this.props

        return movies.slice(0, 6).map(m => 
            <Link 
                to = {`/movies/${m.id}`}
                onClick = {this.onLinkClick}
                key = {m.id}
                className = 'search__item' 
            >
                {m.title}
                <span>{m.year}</span>
            </Link>
        )
    }

    render() {
        return (
            <div className='search-box'>
                <div className='search__input-box'>
                    <input
                        onChange = {this.onChange}
                        onBlur = {this.onBlur}
                        onKeyPress = {this.onKeyPress}
                        onFocus = {this.onFocus}
                        className='search__input'
                        value = {this.state.value}
                        placeholder='Find movies'
                    />
                    <Link 
                        to = {`/movies/search/${this.state.value}`}
                        className='search__btn btn-search flex-center'
                        onClick = {this.onLinkClick}
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
