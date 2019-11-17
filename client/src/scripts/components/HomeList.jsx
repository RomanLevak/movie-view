import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import MoviePoster from './MoviePoster'
import ListPoster from './ListPoster'
import Slider from 'react-slick'
import Loader from './Loader'
import {loadMovies, loadLists} from '../AC/index'
import {mapToArr} from '../helpers'
import {Link} from 'react-router-dom'
import 'slick-carousel/slick/slick.css'

// Arrow for slider
function Arrow(props) {
    const {style, onClick, next} = props

    return (
        <div
            className = {next ? 'home-list__next-arrow' : 'home-list__prev-arrow'}
            style={{...style, display: 'block'}}
            onClick={onClick}
        >
            <img src='/styles/images/arrow.svg'/>
        </div>
    )
}

Arrow.propTypes = {
    style: PropTypes.object,
    onClick: PropTypes.func,
    next: PropTypes.bool
}

class HomeList extends Component {

    static propTypes = {
        type: PropTypes.oneOf(['movies', 'lists']),
        title: PropTypes.string.isRequired,
        // from connect
        entities: PropTypes.arrayOf(PropTypes.object).isRequired,
        loading: PropTypes.bool.isRequired,
        loaded: PropTypes.bool.isRequired,
        error: PropTypes.string.isRequired,
        loadEntities: PropTypes.func
    }

    componentDidMount() {
        const {loading, loaded, loadEntities} = this.props

        if(!loading || !loaded)
            loadEntities()
    }

    getListsArr = () => {
        const lists = this.props.entities

        const items = []

        lists.slice(0, 6).map(list =>
            items.push(
                <li className='home-list__item' key={list.id}>
                    <ListPoster
                        key = {list.id}
                        list = {{
                            id: list.id,
                            title: list.title,
                            moviesIds: list.movies
                        }}
                        author = {{
                            id: list.user._id,
                            name: list.user.displayName
                        }}
                    />
                </li>
            )
        )

        return items
    }

    getMoviesArr = () => {
        const movies = this.props.entities

        const items = []

        movies.slice(0, 18).map(movie =>
            items.push(
                <li className='home-list__item' key={movie.id}>
                    <MoviePoster
                        title = {movie.title}
                        year = {movie.year}
                        path = {movie.poster_path}
                        url = {`/movies/${movie.id}`}
                    />
                </li>
            )
        )

        return items
    }

    getBody = () => {
        const {type, title} = this.props

        let items = []

        if(type == 'movies')
            items = this.getMoviesArr()

        else if(type == 'lists')
            items = this.getListsArr()

        // settings for slider
        const settings = {
            dots: false,
            infinite: true,
            speed: 1100,
            slidesToShow: 6,
            slidesToScroll: 6,
            nextArrow: <Arrow next />,
            prevArrow: <Arrow />
        }

        return (
            <>
                <h2 className='home-list__title'>{title}</h2>
                <Slider className='flex-center'
                    {...settings}
                >
                    {items}
                </Slider>
                <Link to = {`/${type}`} className='home-list__link'>
                    view more...
                </Link>
            </>
        )
    }

    render() {
        const {loading, loaded, error} = this.props

        if(error)
            return <span>error</span>

        if(loading || !loaded)
            return <Loader />

        return (
            <div className='home-list home-list-box'>
                {this.getBody()}
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const {type} = ownProps

    if(type == 'movies')
        return {
            entities: mapToArr(state.movies.entities),
            loading: state.movies.loading,
            loaded: state.movies.loaded,
            error: state.movies.error
        }

    if(type == 'lists') {
        return {
            entities: mapToArr(state.lists.entities),
            loading: state.lists.loading,
            loaded: state.lists.loaded,
            error: state.lists.error
        }
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    const {type} = ownProps
    let loadEntities

    if(type == 'movies')
        loadEntities = () => dispatch(loadMovies({
            type: 'popular', page: 1
        }))

    if(type == 'lists')
        loadEntities = () => dispatch(loadLists())
    return {loadEntities}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeList)
