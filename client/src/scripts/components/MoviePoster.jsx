import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

class Poster extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        poster_path: PropTypes.string.isRequired,
        year: PropTypes.string.isRequired,
        url: PropTypes.string,
    }

    render() {
        const {poster_path, year, title, url} = this.props
        const img_url = poster_path ? `/tmdbimg/${poster_path}` : '/styles/images/not-found.svg'

        return (
            <div className='poster-box movie-poster'>
                <Link to={url}>
                    <img src={img_url} alt='' className='movie-img' />
                </Link>
                <div className='poster__text-box'>
                    <Link to={url}>
                        <span className='movie-poster__title'>{title}</span>
                    </Link>
                    <span className='movie-poster__year'>{year}</span>
                </div>
            </div>
        )
    }
}

export default Poster
