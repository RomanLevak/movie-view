import {connect} from 'react-redux'
import selectMovies from '../../selectors/movies'
import selectLists from '../../selectors/lists'
import {loadMovies, loadLists} from '../../AC/index'
import {default as ListPoster} from '../posters/List'
import {default as MoviePoster} from '../posters/Movie'


function mapStateToProps(state, ownProps) {
    const {type} = ownProps

    if(type == 'movies')
        return {
            ...selectMovies(state),
            Item: MoviePoster
        }

    else if(type == 'lists') {
        /*
         * next script will add isOwner: true/false property,
         * if component needs to select a lists of specific author,
         * depending on the logged user
         */

        const {filters} = ownProps
        let authorName = ''

        if(filters && filters.authorName)
            authorName = filters.authorName

        if(
            authorName &&
            state.user.entity
        ) {
            const loggedUserName = state.user.entity.displayName

            return {
                ...selectLists(state),
                Item: ListPoster,
                isOwner: authorName == loggedUserName
            }
        }

        return {
            ...selectLists(state),
            Item: ListPoster,
        }
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    const {type, filters} = ownProps
    let loadEntities

    if(type == 'movies')
        loadEntities = () => dispatch(loadMovies(filters))

    if(type == 'lists')
        loadEntities = () => dispatch(loadLists(filters))

    return {loadEntities}
}

function connectToMoviesAndLists(Component) {
    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(Component)
}

export default connectToMoviesAndLists
