import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import makeSelectListPoster from '../selectors/list-poster'
import {loadListPoster} from '../AC/index'
import Loader from './Loader'
import MoviePoster from './MoviePoster'

class ListPoster extends Component {

    static propTypes = {
        id: PropTypes.string.isRequired,
        // from connect
        list: PropTypes.object,
        loading: PropTypes.bool.isRequired,
        loaded: PropTypes.bool.isRequired,
        error: PropTypes.string,
        loadListPoster: PropTypes.func.isRequired
    }

    componentDidMount() {
        const {id} = this.props
        const {loaded, loading, loadListPoster} = this.props

        if(!loading || !loaded)
            loadListPoster(id)
    }

    getMiniPosters = () => {
        let imgs = []

        this.props.list.movies.slice(0, 4).map(movieId =>
            imgs.push(
                <MoviePoster
                    isMini
                    key = {movieId}
                    id = {movieId}
                />
            )
        )

        return imgs
    }

    getLoadingBody = () =>
        <div className='poster-box'>
            <div className='list-poster__imgs-box'>
                <MoviePoster isMini />
            </div>
            <div className='list-poster__info'>
                <span className='list-poster__title'>...</span>
                <span className='list-poster__author-box'>
                    author:
                    <span className='list-poster__author-name'>
                        ...
                    </span>
                </span>
            </div>
        </div>

    render() {
        const {loading, loaded, error, id, list} = this.props

        if(error)
            return <span className='error-msg'>{error}</span>

        else if(loading || !loaded)
            return this.getLoadingBody()

        const {title, author} = list

        return (
            <div className='poster-box'>
                <Link
                    to={{
                        pathname: `/lists/${id}`,
                        fromList: {...this.props}
                    }}
                >
                    <div className='list-poster__imgs-box'>
                        {this.getMiniPosters()}
                    </div>
                </Link>
                <div className='list-poster__info'>
                    <Link
                        to={{
                            pathname: `/lists/${id}`,
                            ...this.props
                        }}
                    >
                        <span className='list-poster__title'>
                            {title}
                        </span>
                    </Link>
                    <span className='list-poster__author-box'>
                        author:
                        <Link
                            to={`/lists/author/${author.name}`}
                            className='list-poster__author-name'
                        >
                            {author.name}
                        </Link>
                    </span>
                </div>
            </div>
        )
    }
}

const makeMapStateToProps = () => {
    const selectListPoster = makeSelectListPoster()

    return (state, props) =>
        selectListPoster(state, props)
}

export default connect(
    makeMapStateToProps,
    {loadListPoster}
)(ListPoster)
