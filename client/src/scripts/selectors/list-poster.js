import {createSelector} from 'reselect'

const selectListPoster = (state, props) =>
    state.listPosters[props.id]

const makeSelectListPoster = () =>
    createSelector(
        selectListPoster,
        poster => {
            if(!poster)
                return {
                    loading: false,
                    loaded: false,
                    error: '',
                    list: {}
                }

            return {
                ...poster,
                list: poster.entity
            }
        }
    )

export default makeSelectListPoster
