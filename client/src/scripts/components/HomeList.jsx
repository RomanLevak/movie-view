import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import connectToMoviesAndLists from './containers/moviesAndLists'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import Loader from './Loader'
import ListPoster from './ListPoster'
import MoviePoster from './MoviePoster'

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
        withSlider: PropTypes.bool,
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

    getSlider = items => {
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
            <ul className='home-list__slider'>
                <Slider className='flex-center' {...settings}>
                    {items}
                </Slider>
            </ul>
        )
    }

    getListsArr = () => {
        const lists = this.props.entities

        const items = []

        lists.slice(0, 6).map(list =>
            items.push(
                <li className='home-list__item' key={list.id}>
                    <ListPoster id = {list.id} />
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
                    <MoviePoster id = {movie.id} />
                </li>
            )
        )

        return items
    }

    getBody = () => {
        const {type, withSlider} = this.props

        let items = []

        if(type == 'movies')
            items = this.getMoviesArr()
        else if(type == 'lists')
            items = this.getListsArr()

        if(withSlider)
            return (
                <ul className='home-list__slider'>
                    {this.getSlider(items)}
                </ul>
            )

        return (
            <ul className = 'home-list'>
                {items}
            </ul>
        )
    }

    render() {
        const {loading, loaded, error} = this.props

        if(error)
            return <span className = 'error-msg'>{error}</span>

        if(loading || !loaded)
            return <Loader />

        const {title, type} = this.props

        return (
            <div className='home-list-box'>
                <h2 className='home-list__title'>{title}</h2>
                    {this.getBody()}
                <Link to={`/${type}`} className='home-list__link'>
                    view more...
                </Link>
            </div>
        )
    }
}

export default connectToMoviesAndLists(HomeList)
