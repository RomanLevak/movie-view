import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {mapToArr} from '../helpers'
import {searchMovie} from '../AC'
import popUp from './decorators/popUp'

class Search extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    static propTypes = {
        // from popUp decorator
        setPopUpRef: PropTypes.func.isRequired,
        setToggleBtnRef: PropTypes.func.isRequired,
        closePopUp: PropTypes.func.isRequired,
        openPopUp: PropTypes.func.isRequired,
        isOpen: PropTypes.bool.isRequired,
        // from connect
        movies: PropTypes.array.isRequired,
        searchMovie: PropTypes.func.isRequired
    }

    state = {
        value: ''
    }

    onChange = e => {
        const {value} = e.target
        const {searchMovie, openPopUp, closePopUp} = this.props

        this.setState({value})

        if(!value)
            return closePopUp()

        openPopUp()
        searchMovie(value, true)
    }

    // handles click on 'Enter' key
    onKeyPress = e => {
        const {history} = this.context.router
        const {value} = this.state

        if(e.key == 'Enter') {
            history.push(`/movies/search/${value}`)
            this.props.closePopUp()
        }
    }

    onFocus = () =>
        this.props.openPopUp()

    getResults = () =>
        this.props.movies.slice(0, 8).map(movie =>
            <Link className='search__item'
                to={`/movies/${movie.id}`}
                key={movie.id}
                onClick={this.props.closePopUp}
            >
                {movie.title}
                <span>{movie.year}</span>
            </Link>
        )

    render() {
        const {setToggleBtnRef, isOpen} = this.props
        const {value} = this.state

        return (
            <div className='search-box'>
                <div className='search__input-box'
                    onFocus={this.onFocus}
                >
                    <input className='search__input'
                        onChange={this.onChange}
                        onKeyPress={this.onKeyPress}
                        value={this.state.value}
                        placeholder='Find movies'
                    />
                    <Link className='search__btn btn-search flex-center'
                        to={`/movies/search/${value}`}
                    >
                        <span className='icon-search'></span>
                    </Link>
                    <div className='search__results-box'
                        ref={setToggleBtnRef}
                    >
                        { isOpen ?
                            this.getResults() :
                            null
                        }
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
)(popUp(Search))
