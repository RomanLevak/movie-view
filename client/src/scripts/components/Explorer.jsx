import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'
import connectToMoviesAndLists from './decorators/moviesAndLists'
import {genres} from '../constants'
import ReactPaginate from 'react-paginate'
import Loader from './Loader'

class Explorer extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    static propTypes = {
        type: PropTypes.oneOf(['movies', 'lists']).isRequired,
        Item: PropTypes.elementType.isRequired,
        filters: PropTypes.object,
        // from connect
        entities: PropTypes.array,
        totalPages: PropTypes.number,
        loading: PropTypes.bool.isRequired,
        loaded: PropTypes.bool.isRequired,
        loadEntities: PropTypes.func.isRequired,
        error: PropTypes.string,
        /*
         * if Explorer renders a lists of specific author,
         * isOwner will tell if the logged user is an author
         * of these lists
         */
        isOwner: PropTypes.bool
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
                pageCount              = {this.props.totalPages}
                pageRangeDisplayed     = {7}
                marginPagesDisplayed   = {2}
                onPageChange           = {this.onPageChange}
                initialPage            = {this.props.filters.page - 1}
                disableInitialCallback
                previousLabel          = '<'
                nextLabel              = '>'
                containerClassName     = 'pagination-list'
                activeClassName        = 'pagination__item-active'
                pageClassName          = 'pagination__item flex-center'
                previousClassName      = 'pagination__item flex-center'
                nextClassName          = 'pagination__item flex-center'
            />
        )
    }

    getBody = () => {
        const {
            Item, entities, filters, isOwner,
            loading, loaded, error
        } = this.props

        if(error)
            return <span className = 'error-msg'>{error}</span>

        if(loading || !loaded)
            return <Loader type='squares' />

        if(!entities.length && filters && filters.authorName)
            return (
                <span className='explorer__list-msg'>
                    {isOwner ?
                        'You don\'t ' :
                        `${filters.authorName} doesn't `
                    }
                    have any lists yet
                </span>
            )

        return entities.slice(0, 12).map(entity =>
            <li className = 'explorer__item' key = {entity.id}>
                <Item id = {entity.id} />
            </li>
        )
    }

    render() {
        return (
            <div className='explorer explorer-box'>
                <ul className='explorer__list'>
                    {this.getBody()}
                </ul>
                <div className='explorer__sidebar sidebar'>
                    <h6 className='sidebar__item'>
                        <NavLink
                            to = '/movies/popular/1'
                            exact
                            className='sidebar__item'
                            activeClassName='sidebar__item-active'
                        >
                            Popular now
                        </NavLink>
                        <NavLink to = '/lists/'
                            exact
                            className='sidebar__item'
                            activeClassName='sidebar__item-active'
                        >
                            Latest lists
                        </NavLink>
                    </h6>
                    <h6 className='sidebar-list__heading'>Genres</h6>
                    <ul className='sidebar-list'>
                        {this.getGenresList()}
                    </ul>
                </div>
                <div className='explorer__pagination pagination pagination-box'>
                    {this.getPagination()}
                </div>
            </div>
        )
    }
}

export default connectToMoviesAndLists(Explorer)
