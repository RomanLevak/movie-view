import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link, NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {mapToArr} from '../helpers'
import {loadMovies} from '../AC/index'
import {genres} from '../constants'
import ReactPaginate from 'react-paginate'
import Loader from './Loader'
import MoviePoster from './MoviePoster'

class Explorer extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    static propTypes = {
        filters: PropTypes.shape({
            genreID: PropTypes.number,
            type: PropTypes.string.isRequired,
            page: PropTypes.number.isRequired
        }).isRequired,
        // from connect
        movies: PropTypes.array,
        total_pages: PropTypes.number,
        loading: PropTypes.bool.isRequired,
        loaded: PropTypes.bool.isRequired,
        loadMovies: PropTypes.func.isRequired,
        error: PropTypes.string
    }

    componentDidMount() {
        const {loadMovies, loaded, loading, filters} = this.props

        if(!loading || !loaded)
            loadMovies(filters)
    }

    onPageChange = ({selected}) => {
        const {history} = this.context.router
        history.push(`${selected + 1}`)
    }

    getGenresList = () =>
        genres.map(genre =>
            <li className = 'sidebar-list__item' key = {genre.id}>
                <NavLink
                    activeClassName = 'sidebar-list__item-active'
                    to = {`/movies/genres/${genre.name}`}>
                    {genre.name}
                </NavLink>
            </li>
        )

    getBody = () => {
        const {movies, loading, loaded, error} = this.props

        if(error)
            return <span className = 'error-msg'>{error}</span>

        if(loading || !loaded)
            return <Loader />

        return movies.slice(0, 10).map(movie =>
            <li className = 'explorer__item' key = {movie.id}>
                <MoviePoster id = {movie.id} />
            </li>
        )
    }

    render() {
        return (
            <div className='explorer'>
                <ul className='explorer-list'>
                    {this.getBody()}
                </ul>
                <div className='explorer__sidebar sidebar'>
                    <h6 className='sidebar__item'>
                        <Link to = '/movies' className='sidebar__item'>
                            Popular now
                        </Link>
                    </h6>
                    <h6 className='sidebar-list__heading'>Genres</h6>
                    <ul className='sidebar-list'>
                        {this.getGenresList()}
                    </ul>
                </div>
                <div className='explorer-pagination pagination pagination-box'>
                    <ReactPaginate
                        pageCount = 			{this.props.total_pages}
                        pageRangeDisplayed =	{7}
                        marginPagesDisplayed =	{2}
                        onPageChange =			{this.onPageChange}
                        initialPage =			{this.props.filters.page - 1}
                        disableInitialCallback
                        previousLabel 	= '<'
                        nextLabel 		= '>'
                        containerClassName = 	'pagination-list'
                        activeClassName = 		'pagination__item-active'
                        pageClassName = 		'pagination__item flex-center'
                        previousClassName = 	'pagination__item flex-center'
                        nextClassName = 		'pagination__item flex-center'
                    />
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        movies: mapToArr(state.movies.entities),
        total_pages: state.movies.total_pages,
        loading: state.movies.loading,
        loaded: state.movies.loaded,
        error: state.movies.error
    }),
    {loadMovies},
)(Explorer)
