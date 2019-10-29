import React, {Component} from 'react'
import Explorer from '../Explorer'
import MovieInfo from '../MovieInfo'
import Results from '../Results'
import {Route, Redirect} from 'react-router-dom'
import {genres} from '../../constants'

class Movies extends Component {

    render() {
        return (
            <div className="explorer-box">
                <Route path = '/movies' render = {this.getDefaultExplorer} exact />
                <Route path = '/movies/popular' render = {this.getDefaultExplorer} exact />
                <Route path = '/movies/popular/:page' render = {this.getDefaultExplorer} exact />
                <Route path = '/movies/genres/:genre/:page' render = {this.getExplorerWithGenre} exact />
                <Route path = '/movies/genres/:genre' render = {this.getExplorerWithGenre} exact />
                <Route path = '/movies/search/:query' render = {this.getResults} exact />
                <Route path = '/movies/:id' render = {this.getMovie} exact />
            </div>
        )
    }

    getResults = ({match}) => {
        const {query} = match.params

        return <Results query = {query} key = {query} />
    }

    getDefaultExplorer = ({match}) => {
        const {page} = match.params
        if(!page)
            return <Redirect to = {'/movies/popular/1'}/>

        return  <Explorer filters = {{type: 'popular', page: parseInt(page)}} key = {'popular' + page}/>
    }

    getExplorerWithGenre = ({match}) => {
        const {genre, page} = match.params

        if(!page)
            return <Redirect to = {`/movies/genres/${genre}/1`} />

        const genreID = genres.find(g => g.name == genre).id    // finding an id by genre name

        return <Explorer filters = {{
            genreID,
            type: genre,
            page: parseInt(page)
        }} key = {genreID + page} />
    }

    getMovie = ({match}) => {
        const {id} = match.params

        return <MovieInfo id = {match.params.id} key = {id}/>
    }
}

export default Movies
