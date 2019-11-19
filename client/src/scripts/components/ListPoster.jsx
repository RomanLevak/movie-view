import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {mapToArr} from '../helpers'
import MoviePoster from './MoviePoster'

class ListPoster extends Component {

    static propTypes = {
        list: PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            moviesIds: PropTypes.arrayOf(PropTypes.string).isRequired,
        }).isRequired,
        author: PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        }).isRequired,
        // from connect
        posters: PropTypes.array
    }

    getMiniPosters = () => {
        let imgs = []

        this.props.list.moviesIds.slice(0, 4).map(movieId =>
            imgs.push(
                <MoviePoster
                    isMini
                    key = {movieId}
                    id = {movieId}
                    {...this.props.posters[movieId]}
                />
            )
        )

        return imgs
    }

    render() {
        const {title, id} = this.props.list
        const authorId = this.props.author.id
        const authorName = this.props.author.name

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
                        <span className='list-poster__title'>{title}</span>
                    </Link>
                    <span className='list-poster__author-box'>
                        author:
                        <Link to={`/lists/author/${authorId}`}>
                            <span className='list-poster__author-name'>
                                {authorName}
                            </span>
                        </Link>
                    </span>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        posters: mapToArr(state.posters)
    })
)(ListPoster)
