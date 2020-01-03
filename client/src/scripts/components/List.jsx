import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import connectToMoviesAndLists from './decorators/moviesAndLists'
import Slider from './Slider'
import Loader from './Loader'

class List extends Component {

    static propTypes = {
        filters: PropTypes.shape({
            type: PropTypes.oneOf([
                'popular', 'similar', 'lists'
            ]).isRequired
        }).isRequired,
        Item: PropTypes.elementType.isRequired,
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

    render() {
        const {loading, loaded, error} = this.props

        if(error)
            return <span className='error-msg'>{error}</span>

        if(loading || !loaded)
            return <Loader type='squares' />

        const {title, type} = this.props

        return (
            <div className='home-list-box'>
                <h2 className='home-list__title'>
                    <Link className='home-list__link'
                        to={`/${type}`}
                    >
                        {title}
                    </Link>
                </h2>
                {this.getBody()}
            </div>
        )
    }

    getBody = () => {
        const {Item, withSlider, entities} = this.props
        const items = []
        let itemsCount

        if(withSlider)
            itemsCount = 18
        else
            itemsCount = 6

        entities.slice(0, itemsCount).map(entity =>
            items.push(
                <li className='home-list__item' key={entity.id}>
                    <Item id={entity.id} />
                </li>
            )
        )

        return (
            <ul className={
                `home-list${withSlider ? '__slider' : ''}`
            }
            >
                { withSlider ?
                    <Slider>{items}</Slider> :
                    items
                }
            </ul>
        )
    }
}

export default connectToMoviesAndLists(List)
