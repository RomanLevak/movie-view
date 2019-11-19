import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import MoviePoster from './MoviePoster'
import Loader from './Loader'
import {loadListInfo} from '../AC/index'
import {parseDate} from '../helpers'

class ListInfo extends Component {

    static propTypes = {
        match: PropTypes.object,
        id: PropTypes.string,
        // from connect
        list: PropTypes.object,
        loading: PropTypes.bool,
        loaded: PropTypes.bool,
        loadListInfo: PropTypes.func,
        error: PropTypes.string
    }

    componentDidMount() {
        const {loadListInfo, loading, loaded, id} = this.props

        if(!loaded || !loading)
            loadListInfo(id)
    }

    getMovePosters = () => {
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
                    {this.getMovePosters()}
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
