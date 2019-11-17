import React, {Component} from 'react'
import Explorer from '../Explorer'
import MovieInfo from '../MovieInfo'
import Results from '../Results'
import PropTypes from 'prop-types'
import {Route, Redirect} from 'react-router-dom'
import {genres} from '../../constants'

class Movies extends Component {

    static propTypes = {
        match: PropTypes.object
    }

    render() {
        const {url} = this.props.match

        return (
            <div className="explorer-box">
                <Route path = {url} render = {this.getDefaultExplorer} exact />
                <Route path = {`${url}/popular`} render = {this.getDefaultExplorer} exact />
                <Route path = {`${url}/popular/:page`} render = {this.getDefaultExplorer} exact />
                <Route path = {`${url}/genres/:genre/:page`} render = {this.getExplorerWithGenre} exact />
                <Route path = {`${url}/genres/:genre`} render = {this.getExplorerWithGenre} exact />
                <Route path = {`${url}/search/:query`} render = {this.getResults} exact />
                <Route path = {`${url}/:id`} render = {this.getMovie} exact />
            </div>
        )
    }

    getResults = ({match}) => {
        const {query} = match.params

        return <Results query = {query} key = {query} />
    }

    getDefaultExplorer = ({match}) => {
        const {page} = match.params
        const {url} = match

        if(!page)
            return <Redirect to = {`${url}/popular/1`}/>

        return (
            <Explorer
                filters = {{type: 'popular', page: parseInt(page)}}
                key = {'popular' + page}
            />
        )
    }

    getExplorerWithGenre = ({match}) => {
        const {genre, page} = match.params
        const {url} = match

        if(!genres.map(genre => genre.name).includes(genre))
            return <Redirect to={'/not-found'} />

        if(!page)
            return <Redirect to = {`${url}/1`} />

        // finding genre id by genre name
        const genreID = genres.find(g => g.name === genre).id

        return (
            <Explorer
                filters = {{
                    genreID,
                    type: genre,
                    page: parseInt(page)
                }}
                key = {genreID + page}
            />
        )
    }

    getMovie = ({match}) => {
        const {id} = match.params

        return <MovieInfo id = {match.params.id} key = {id}/>
    }
}

export default Movies
