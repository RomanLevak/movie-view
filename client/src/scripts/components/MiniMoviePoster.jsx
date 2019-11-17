import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {loadMoviePoster} from '../AC/index'

/*
 * list poster consists of four movie posters
 * called 'miniMovieePoster'
 */
class MiniMoviePoster extends Component {

    static propTypes = {
        id: PropTypes.string.isRequired,
        // from connect
        loading: PropTypes.bool,
        loaded: PropTypes.bool,
        path: PropTypes.string,
        error: PropTypes.string,
        loadMoviePoster: PropTypes.func
    }

    componentDidMount() {
        const {id} = this.props
        const {loading, loaded, loadMoviePoster} = this.props

        if(!loaded || !loading)
            loadMoviePoster(id)
    }

    render() {
        const {loading, loaded, path, error} = this.props
        let posterPath = ''

        if(error)
            posterPath = '/styles/images/not-found.png'

        else if(loading || !loaded)
            posterPath = ''

        else
            posterPath = `/tmdbimg/${path}`

        return (
            <div className='list-poster__img-box'>
                <img src={posterPath} />
            </div>
        )
    }
}

export default connect(
    (state, ownProps) => {
        const {id} = ownProps

        if(!state.posters[id])
            return {
                loading: false,
                loaded: false,
                error: '',
                path: ''
            }

        const poster = state.posters[id]

        return {
            ...poster,
            path: poster.entity.poster_path
        }
    },
    {loadMoviePoster}
)(MiniMoviePoster)
