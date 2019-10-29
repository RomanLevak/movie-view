import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Poster from './Poster'
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

class HomeList extends Component {

    static propTypes = {
        name: PropTypes.oneOf(['Popular now', 'Selections']),
        // from connect
        movies: PropTypes.array,
        loading: PropTypes.bool.isRequired,
        loaded: PropTypes.bool.isRequired,
        loadMovies: PropTypes.func
    }

    componentDidMount() {
        const {loading, loaded, loadMovies} = this.props
        if(!loading || !loaded)
            loadMovies({type: 'popular', page: 1})
    }

    getBody = () => {
        const {movies, loading} = this.props

        if(loading) return <Loader />

        const items = []
        // creating movie posters array
        movies.slice(0, 18).map(m =>
            items.push(
                <li  className='home-list__item' key={m.id} >
                    <Link to = {`/movies/${m.id}`}>
                        <Poster
                            title = {m.title}
                            year = {m.year}
                            poster_path = {m.poster_path}
                        />
                    </Link>
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
            <Slider className='flex-center'
                {...settings}
            >
                {items}
            </Slider>)
    }

    render() {
        return (
            <div className='home-list-box'>
                <h2 className='home-list__title'>Popular now</h2>
                {this.getBody()}
                <Link to = '/movies' className='home-list__link'>view more...</Link>
            </div>
        )
    }
}

export default connect(
    state => ({
        movies: mapToArr(state.movies.entities),
        loading: state.movies.loading,
        loaded: state.movies.loaded
    }),
    {loadMovies}
)(HomeList)
