import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Redirect, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {parseDate} from '../helpers'
import {loadListInfo, updateList} from '../AC/index'
import Loader from './Loader'
import {default as MoviePoster} from './posters/Movie'

class ListInfo extends Component {

    static propTypes = {
        match: PropTypes.object,
        id: PropTypes.string.isRequired,
        // from connect
        list: PropTypes.object,
        loading: PropTypes.bool.isRequired,
        loaded: PropTypes.bool.isRequired,
        error: PropTypes.string,
        isOwner: PropTypes.bool.isRequired,
        loadListInfo: PropTypes.func.isRequired,
        updateList: PropTypes.func.isRequired
    }

    state = {
        editable: this.props.isOwner,
        isEditTitle: false,
        value: ''
    }

    static getDerivedStateFromProps(props, state) {
        let updatedState = {}

        if(state.isEditTitle)
            return null

        updatedState.editable = props.isOwner
        updatedState.value = props.list.title

        return updatedState
    }

    setTitleInputRef = el =>
        this.titleInput = el

    componentDidMount() {
        const {loadListInfo, loading, loaded, id} = this.props

        if(!loaded || !loading)
            loadListInfo(id)
    }

    componentDidUpdate = () => {
        if(this.titleInput)
            this.titleInput.focus()
    }

    handleEditBtnClick = () => {
        this.setState({isEditTitle: !this.state.isEditTitle})

        // if title wasn't changed
        if(this.state.value == this.props.list.title)
            return

        const {value} = this.state
        const {updateList} = this.props
        const {id} = this.props.list

        updateList(id, [{
            propName: 'title',
            value
        }])
    }

    handleTitleChange = e =>
        this.setState({value: e.target.value})

    getMoviePosters = () => {
        const movieIds = this.props.list.movies
        const movies = []

        movieIds.map(movieId =>
            movies.push(
                <div className='list__item' key={movieId}>
                    <MoviePoster id = {movieId} />
                </div>
            )
        )

        return movies
    }

    render() {
        const {loading, loaded, error} = this.props
        const {editable, isEditTitle} = this.state

        if(error)
            return error === 'Not Found' ?
                <Redirect to='/not-found' /> :
                <span className = 'error-msg'>{error}</span>

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
                <div className='list__title-box'>
                    <h2 className='list__title'>
                        { isEditTitle ?
                            <input className='list__title-input'
                                ref={this.setTitleInputRef}
                                value={this.state.value}
                                onChange={this.handleTitleChange}
                            />
                            :
                            title
                        }
                    </h2>
                    { editable ?
                        <span
                            className={'list__title-edit' + (isEditTitle ? ' seagreen' : '') }
                            onClick={this.handleEditBtnClick}
                        >
                            {isEditTitle ? '✓' : '🖉'}
                        </span>
                        :
                        null
                    }
                </div>
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
                <div className='list__movies-box'>
                    {this.getMoviePosters()}
                </div>
            </div>
        )
    }
}

export default connect(
    state => {
        const {listInfo, user} = state
        let isOwner = false

        if(listInfo.loaded && user.entity)
            isOwner = listInfo.entity.author.id == user.entity.id

        return {
            list: listInfo.entity,
            loading: listInfo.loading,
            loaded: listInfo.loaded,
            error: listInfo.error,
            isOwner
        }
    },
    {loadListInfo, updateList}
)(ListInfo)
