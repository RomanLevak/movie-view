import {createSelector} from 'reselect'

const selectMoviePoster = (state, props) =>
    state.moviePosters[props.id]

const makeSelectMoviePoster = () =>
    createSelector(
        selectMoviePoster,
        poster => {
            if(!poster)
                return {
                    loading: false,
                    loaded: false,
                    error: '',
                    movie: null
                }

            return {
                ...poster,
                movie: poster.entity
            }
        }
    )

export default makeSelectMoviePoster
