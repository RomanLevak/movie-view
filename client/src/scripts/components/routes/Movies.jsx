import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Route, Redirect, Switch} from 'react-router-dom'
import {genres} from '../../constants'
import MovieInfo from '../MovieInfo'
import Results from '../Results'
import Explorer from '../Explorer'

class Movies extends Component {

    static propTypes = {
        match: PropTypes.object
    }

    render() {
        const {url} = this.props.match

        return (
            <div className="explorer-box">
                <Switch>
                    <Route path = {`${url}/popular/:page`} render = {this.getDefaultExplorer} />
                    <Route path = {`${url}/popular`} render = {this.getDefaultExplorer} />
                    <Route path = {`${url}/genres/:genre/:page`} render = {this.getExplorerWithGenre} />
                    <Route path = {`${url}/genres/:genre`} render = {this.getExplorerWithGenre} />
                    <Route path = {`${url}/search/:query`} render = {this.getResults} />
                    <Route path = {`${url}/:id`} render = {this.getMovie} />
                    <Route path = {url} render = {this.getDefaultExplorer} />
                </Switch>
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

        if(!page) {
            if(url.includes('popular'))
                return <Redirect to = {`${url}/1`}/>
            else
                return <Redirect to = {`${url}/popular/1`}/>
        }

        return (
            <Explorer
                type = 'movies'
                filters = {{
                    page: parseInt(page)
                }}
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
                type = 'movies'
                filters = {{
                    genreID,
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
