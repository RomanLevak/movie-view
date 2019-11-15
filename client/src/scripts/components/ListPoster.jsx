import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

class ListPoster extends Component {

    static propTypes = {
        list: PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            posters: PropTypes.arrayOf(PropTypes.string).isRequired,
        }).isRequired,
        author: PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        }).isRequired,
    }

    getImgs = () => {
        let imgs = []

        this.props.list.posters.slice(0, 4).map(posterPath =>
            imgs.push(
                <div className='list-poster__img-box' key={posterPath}>
                    <img src={posterPath} />
                </div>
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

export default ListPoster
