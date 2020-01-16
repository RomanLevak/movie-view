/* eslint-disable react/jsx-equals-spacing */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import {mapToArr} from '../helpers'
import connectToMoviesAndLists from './decorators/moviesAndLists'
import {genres as genresObj} from '../constants'
import ReactPaginate from 'react-paginate'
import Loader from './Loader'

const genres = mapToArr(genresObj)

class Explorer extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    static propTypes = {
        Item: PropTypes.elementType.isRequired,
        filters: PropTypes.shape({
            type: PropTypes.oneOf([
                'popular', 'by_genre', 'lists',
            ]).isRequired,
            page: PropTypes.number.isRequired,
            authorName: PropTypes.string
        }).isRequired,
        // from connect
        entities: PropTypes.array.isRequired,
        totalPages: PropTypes.number.isRequired,
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

    state = {
        // for animation handling
        prevPage: 0,
        curPage: 1,
        isNextPage: false
    }

    componentDidMount() {
        const {loadEntities, loaded, loading, filters} = this.props

        this.setState({
            prevPage: filters.page
        })

        if(!loading || !loaded)
            loadEntities(filters)
    }

    static getDerivedStateFromProps(props, state) {
        const {filters} = props
        const prevPage = state.curPage
        const curPage = filters.page

        if(prevPage != curPage)
            return {
                prevPage: state.curPage,
                curPage: filters.page
            }

        return null
    }

    onPageChange = ({selected}) => {
        const {history} = this.context.router
        const {loadEntities, filters} = this.props

        history.push(`${selected + 1}`)

        loadEntities({
            ...filters,
            page: selected + 1
        })
    }

    render() {
        const {prevPage, curPage} = this.state
        const isNextPage = (curPage - prevPage) > 0
        this.direction = isNextPage ? 'left' : 'right'

        return (
            <div className='explorer explorer-box'>
                {this.getBody()}
                <div className='explorer__sidebar sidebar'>
                    <h6 className='sidebar__item'>
                        <NavLink className='sidebar__item'
                            activeClassName='sidebar__item-active'
                            to='/movies/popular/1'
                            exact
                        >
                            Popular now
                        </NavLink>
                        <NavLink className='sidebar__item'
                            activeClassName='sidebar__item-active'
                            to='/lists/'
                            exact
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

    getBody = () => {
        const {prevPage, curPage} = this.state
        const isNextPage = (curPage - prevPage) > 0
        this.direction = isNextPage ? 'left' : 'right'

        return (
            <TransitionGroup className='explorer__list-wrap'
                appear={false} exit enter
            >
                <CSSTransition classNames={`slide-${this.direction}`}
                    key={curPage} appear in exit timeout={600}
                    onExit={this.onExit}
                    onExiting={this.onExiting}
                >
                    <ul className='explorer__list'>
                        {this.getItems()}
                    </ul>
                </CSSTransition>
            </TransitionGroup>
        )
    }

    getItems = () => {
        const {
            Item, entities, filters, isOwner,
            loading, loaded, error
        } = this.props

        if(error)
            return <span className='error-msg'>{error}</span>

        if(loading || !loaded)
            return <Loader type='squares' />

        if(!entities.length && filters && filters.authorName)
            return (
                <span className='explorer__list-msg'>
                    { isOwner ?
                        'You don\'t ' :
                        `${filters.authorName} doesn't `
                    }
                    have any lists yet
                </span>
            )

        return entities.slice(0, 12).map(entity =>
            <li className='explorer__item' key={entity.id}>
                <Item id={entity.id} />
            </li>
        )
    }

    getPagination = () => {
        const {totalPages} = this.props

        if(!totalPages || totalPages <= 1)
            return null

        return (
            <ReactPaginate
                pageCount              ={this.props.totalPages}
                pageRangeDisplayed     ={7}
                marginPagesDisplayed   ={2}
                onPageChange           ={this.onPageChange}
                initialPage            ={this.props.filters.page - 1}
                disableInitialCallback
                previousLabel          ='<'
                nextLabel              ='>'
                containerClassName     ='pagination-list'
                activeClassName        ='pagination__item-active'
                pageClassName          ='pagination__item flex-center'
                previousClassName      ='pagination__item flex-center'
                nextClassName          ='pagination__item flex-center'
            />
        )
    }

    getGenresList = () =>
        genres.map(genre =>
            <li className='sidebar-list__item' key={genre.id}>
                <NavLink activeClassName='sidebar-list__item-active'
                    to={`/movies/genres/${genre.name}`}
                >
                    {genre.name}
                </NavLink>
            </li>
        )

    /*
     * set proper className for unmounting animation depending of
     * the direction of selected page (is it next page or previous)
     */
    onExit = node => {
        const {direction} = this
        const oppositeDir = direction == 'left' ? 'right' : 'left'
        node.className = `explorer__list slide-${oppositeDir}-exit`
    }

    onExiting = node => {
        const {direction} = this
        const oppositeDir = direction == 'left' ? 'right' : 'left'
        node.className = `explorer__list slide-${oppositeDir}-exit-active`
    }
}

export default connectToMoviesAndLists(Explorer)
