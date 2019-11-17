import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {loadMoviePoster} from '../AC/index'
import MiniMoviePoster from './MiniMoviePoster'
import {mapToArr} from '../helpers'

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

    getImgs = () => {
        let imgs = []

        this.props.list.moviesIds.slice(0, 4).map(movieId =>
            imgs.push(
                <MiniMoviePoster
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
                <Link to={`/lists/${id}`}>
                    <div className='list-poster__imgs-box'>
                        {this.getImgs()}
                    </div>
                </Link>
                <div className='list-poster__info'>
                    <Link to={`/lists/${id}`}>
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
    }),
    {loadMoviePoster}
)(ListPoster)
