import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {parseDate} from '../helpers'
import {loadListInfo} from '../AC/index'
import Loader from './Loader'
import MoviePoster from './MoviePoster'

class ListInfo extends Component {

    static propTypes = {
        match: PropTypes.object,
        id: PropTypes.string.isRequired,
        // from connect
        list: PropTypes.object,
        loading: PropTypes.bool.isRequired,
        loaded: PropTypes.bool.isRequired,
        error: PropTypes.string,
        loadListInfo: PropTypes.func.isRequired
    }

    componentDidMount() {
        const {loadListInfo, loading, loaded, id} = this.props

        if(!loaded || !loading)
            loadListInfo(id)
    }

    getMoviePosters = () => {
        const movieIds = this.props.list.movies
        const movies = []

        movieIds.map(movieId =>
            movies.push(
                <div
                    className='list__item'
                    key={movieId}
                >
                    <MoviePoster id = {movieId} />
                </div>
            )
        )

        return movies
    }

    render() {
        const {loading, loaded, error} = this.props

        if(error)
            return error === 'Not Found' ?
                <Redirect to='/not-found' /> :
                <span className = 'error-msg'>{error}</span>

        if(loading || !loaded)
            return (
                <div className='list list-box'>
                    <Loader />
                </div>
            )

        const {list} = this.props
        const {title} = list
        const author = list.user

        return (
            <div className='list list-box'>
                <h2 className='list__title'>
                    {title}
                </h2>
                <div className="list__data">
                    <span className="list__author">
                        author:
                        <span className="list__author-name">
                            {author.displayName}
                        </span>
                    </span>
                    <span className="list__created">
                        created at:
                        <span className="list__created-time">
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
    state => ({
        list: state.listInfo.entity,
        loading: state.listInfo.loading,
        loaded: state.listInfo.loaded,
        error: state.listInfo.error
    }),
    {loadListInfo}
)(ListInfo)
