import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import MoviePoster from './MoviePoster'
import Slider from 'react-slick'
import Loader from './Loader'
import {loadMovies} from '../AC/index'
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
        loadEntities: PropTypes.func
    }

    componentDidMount() {
        const {loading, loaded, loadEntities} = this.props

        if(!loading || !loaded)
            loadEntities()
    }

    getMoviesBody = () => {
        const movies = this.props.entities

        const items = []
        // creating movie posters array
        movies.slice(0, 18).map(m =>
            items.push(
                <li  className='home-list__item' key={m.id}>
                    <MoviePoster
                        title = {m.title}
                        year = {m.year}
                        poster_path = {m.poster_path}
                        url = {`/movies/${m.id}`}
                    />
                </li>
            )
        )
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
            <Fragment>
                <Slider className='flex-center'
                    {...settings}
                >
                    {items}
                </Slider>
                <Link to = '/movies' className='home-list__link'>
                    view more...
                </Link>
            </Fragment>
        )
    }

    render() {
        const {type, title, loading} = this.props

        if(loading)
            return <Loader />
        return (
            <div className='home-list home-list-box'>
                <h2 className='home-list__title'>{title}</h2>
                {type == 'movies' ? this.getMoviesBody() : null}
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
            loaded: state.movies.loaded
        }
}

function mapDispatchToProps(dispatch, ownProps) {
    const {type} = ownProps
    let loadEntities

    if(type == 'movies')
        loadEntities = () => dispatch(loadMovies({
            type: 'popular', page: 1
        }))

    return {loadEntities}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeList)
