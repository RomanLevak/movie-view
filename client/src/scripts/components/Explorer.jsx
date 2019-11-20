import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link, NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {mapToArr} from '../helpers'
import {loadMovies} from '../AC/index'
import {loadLists} from '../AC/index'
import {genres} from '../constants'
import ReactPaginate from 'react-paginate'
import Loader from './Loader'
import MoviePoster from './MoviePoster'
import ListPoster from './ListPoster'

class Explorer extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    static propTypes = {
        type: PropTypes.oneOf(['movies', 'lists']).isRequired,
        filters: PropTypes.object,
        // from connect
        Item: PropTypes.elementType,
        entities: PropTypes.array,
        totalPages: PropTypes.number,
        loading: PropTypes.bool.isRequired,
        loaded: PropTypes.bool.isRequired,
        loadEntities: PropTypes.func.isRequired,
        error: PropTypes.string
    }

    componentDidMount() {
        const {loadEntities, loaded, loading, filters} = this.props

        if(!loading || !loaded)
            loadEntities(filters)
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

    getPagination = () => {
        const {totalPages} = this.props

        if(!totalPages || totalPages <= 1)
            return null

        return (
            <ReactPaginate
                pageCount={this.props.totalPages}
                pageRangeDisplayed={7}
                marginPagesDisplayed={2}
                onPageChange={this.onPageChange}
                initialPage={this.props.filters.page - 1}
                disableInitialCallback
                previousLabel='<'
                nextLabel='>'
                containerClassName='pagination-list'
                activeClassName='pagination__item-active'
                pageClassName='pagination__item flex-center'
                previousClassName='pagination__item flex-center'
                nextClassName='pagination__item flex-center'
            />
        )
    }

    getBody = () => {
        const {Item, entities, loading, loaded, error} = this.props

        if(error)
            return <span className = 'error-msg'>{error}</span>

        if(loading || !loaded)
            return <Loader />

        return entities.slice(0, 10).map(entity =>
            <li className = 'explorer__item' key = {entity.id}>
                <Item id = {entity.id} />
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
                    {this.getPagination()}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const {type} = ownProps

    if(type == 'movies')
        return {
            Item: MoviePoster,
            entities: mapToArr(state.movies.entities),
            totalPages: state.movies.totalPages,
            loading: state.movies.loading,
            loaded: state.movies.loaded,
            error: state.movies.error
        }

    if(type == 'lists') {
        return {
            Item: ListPoster,
            entities: mapToArr(state.lists.entities),
            loading: state.lists.loading,
            loaded: state.lists.loaded,
            error: state.lists.error
        }
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    const {type, filters} = ownProps
    let loadEntities

    if(type == 'movies')
        loadEntities = () => dispatch(loadMovies(filters))

    if(type == 'lists')
        loadEntities = () => dispatch(loadLists())

    return {loadEntities}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Explorer)
