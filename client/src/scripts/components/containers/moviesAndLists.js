import {connect} from 'react-redux'
import selectMovies from '../../selectors/movies'
import selectLists from '../../selectors/lists'
import {loadMovies, loadLists} from '../../AC/index'

function mapStateToProps(state, ownProps) {
    const {type} = ownProps

    if(type == 'movies')
        return selectMovies(state)

    else if(type == 'lists')
        return selectLists(state)
}

function mapDispatchToProps(dispatch, ownProps) {
    const {type, filters} = ownProps
    let loadEntities

    if(type == 'movies')
        loadEntities = () => dispatch(loadMovies(filters))

    if(type == 'lists')
        loadEntities = () => dispatch(loadLists())

    return {loadEntities}
}

function connectToMoviesAndLists(Component) {
    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(Component)
}

export default connectToMoviesAndLists
