import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {loadMovieInfo} from '../AC/index'
import Loader from './Loader'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

class MovieInfo extends Component {
 
    static propTypes = {
        id: PropTypes.string,
        //from connect
        movie: PropTypes.object
    }

    getBody() {
        const {loading, loaded, error} = this.props

        if(loading)
            return(
                <div className='movie-box'>
                    <Loader />
                </div>
            )
        if(error)
            return <span className = 'error-msg'>Failed to load resources</span>
        
        if(!loaded)
            return null

        const {
            title, vote_average,
            release_date, adult,
            original_language, poster_path,
            genres, production_countries,
            tagline, runtime, budget, overview
        } = this.props.movie

        return(
            <div className='movie-box'>
                <div className='movie__img flex-center'>
                    <img src = {`/tmdbimg/${poster_path}`} />
                </div>
                <div className='movie__info-box'>
                    <table className='movie__info'>
                        <caption>{title}</caption>
                        <tbody>
                            <tr>
                                <td>Tagline</td>
                                <td>{tagline}</td>
                            </tr>
                            <tr>
                                <td>Rating</td>
                                <td>TMDB {vote_average}</td>
                            </tr>
                            <tr>
                                <td>Release date</td>
                                <td>{release_date}</td>
                            </tr>
                            <tr>
                                <td>Original language</td>
                                <td>{original_language}</td>
                            </tr>
                            <tr>
                                <td>Counries</td>
                                <td>{production_countries.map(c => c.name)}</td>
                            </tr>
                            <tr>
                                <td>Genres</td>
                                <td> {
                                    genres.map(g => 
                                        <Link className='movie__info-link' 
                                            to = {`/movies/genres/${g.name}`}
                                            key = {g.id}
                                        >
                                            {`${g.name}   `}
                                        </Link>)
                                }
                                </td>
                            </tr>
                            <tr>
                                <td>Adult</td>
                                <td>{adult ? 'yes' : 'no'}</td>
                            </tr>
                            <tr>
                                <td>Runtime</td>
                                <td>{`${runtime}m`}</td>
                            </tr>
                            <tr>
                                <td>Budget</td>
                                <td>{`${budget} $`}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className='movie__info-overview'>
                    {overview}
                </p>
             </div>
        )
    }

    componentDidMount() {
        const {id, loadMovieInfo, loading, loaded} = this.props

        if(!loading || !loaded)
            loadMovieInfo(id)
    }

    render() {
        return this.getBody()
    }
}

export default connect(
    state => ({
        movie: state.movieInfo.entity,
        loading: state.movieInfo.loading,
        loaded: state.movieInfo.loaded
    }),
    {loadMovieInfo}
)(MovieInfo)