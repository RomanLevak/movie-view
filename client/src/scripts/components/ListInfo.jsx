import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Redirect, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {parseDate} from '../helpers'
import {isSignedIn} from '../selectors/user'
import {selectListPoster} from '../selectors/list-poster'
import {loadList, updateList} from '../AC/index'
import Loader from './Loader'
import {default as MoviePoster} from './posters/Movie'
import EditableTitle from './list-CUD/EditableTitle'

class ListInfo extends Component {

    static propTypes = {
        match: PropTypes.object,
        id: PropTypes.string.isRequired,
        // from connect
        isSignedIn: PropTypes.bool.isRequired,
        list: PropTypes.object,
        loading: PropTypes.bool.isRequired,
        loaded: PropTypes.bool.isRequired,
        error: PropTypes.string,
        isOwner: PropTypes.bool.isRequired,
        loadList: PropTypes.func.isRequired,
        updateList: PropTypes.func.isRequired
    }

    state = {
        editable: this.props.isOwner,
        value: ''
    }

    componentDidMount() {
        const {loadList, loading, loaded, id} = this.props

        if(!loading || !loaded)
            loadList(id)
    }

    getMoviePosters = () => {
        const {isOwner, isSignedIn} = this.props
        const movieIds = this.props.list.movies
        const listId = this.props.list.id
        const movies = []
        let withButton = ''

        if(isOwner)
            withButton = 'remove'
        else if(isSignedIn)
            withButton = 'add'

        movieIds.map(movieId =>
            movies.push(
                <div className='list__item' key={movieId}>
                    <MoviePoster
                        id={movieId}
                        listId={listId}
                        withButton={withButton}
                    />
                </div>
            )
        )

        return movies
    }

    render() {
        const {loading, loaded, error} = this.props
        const {editable} = this.state

        if(error)
            return error === 'Not Found' ?
                <Redirect to='/not-found' /> :
                <span className='error-msg'>{error}</span>

        if(loading || !loaded)
            return (
                <div className='list list-box'>
                    <Loader type='squares' />
                </div>
            )

        const {list} = this.props
        const {title, author} = list

        return (
            <div className='list list-box'>
                <div className='list__header'>
                    { editable ?
                        <EditableTitle list={this.props.list} />
                        :
                        <h2 className='list__title'>
                            {title}
                        </h2>
                    }
                    <div className='list__data'>
                        <span className='list__author'>
                        author:
                            <Link className='list__author-name'
                                to={`/lists/author/${author.name}`}
                            >
                                {author.name}
                            </Link>
                        </span>
                        <span className='list__created'>
                        created at:
                            <span className='list__created-time'>
                                {parseDate(list.createdAt)}
                            </span>
                        </span>
                    </div>
                </div>
                <div className='list__movies-box'>
                    {this.getMoviePosters()}
                </div>
            </div>
        )
    }
}

export default connect(
    (state, ownProps) => {
        const list = selectListPoster(state, ownProps)

        return {
            ...list,
            isSignedIn: isSignedIn(state)
        }
    },
    {loadList, updateList}
)(ListInfo)
