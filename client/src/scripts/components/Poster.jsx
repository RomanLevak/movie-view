import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Poster extends Component {
    
    static propTypes = {
        title: PropTypes.string.isRequired,
        poster_path: PropTypes.string,
        year: PropTypes.string,
        author: PropTypes.string,
    }

    getBody = () => {
        const {poster_path, year, title, type} = this.props
        const img_url = poster_path ? `/tmdbimg/${poster_path}` : '/styles/images/not-found.svg'

        return(
            <div className='poster-box movie-poster'>
                    <img src={img_url} alt='' className='movie-img' />
                <div className='poster__text-box'>
                    <span className='movie-poster__title'>{title}</span>
                    <span className='movie-poster__year'>{this.props.year}</span>
                </div>
            </div>
        )
    }

    render() {
        return this.getBody()
    }
}

export default Poster