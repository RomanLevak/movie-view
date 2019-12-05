import {createSelector} from 'reselect'

const getUser = state => state.user

const getListPoster = (state, props) => {
    const poster = state.listPosters[props.id]

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

export const selectListPoster = createSelector(
    getListPoster,
    getUser,
    (poster, user) => {
        let isOwner = false

        if(
            user.entity.id &&
            poster.list.author &&
            poster.list.author.id
        )
            isOwner = poster.list.author.id == user.entity.id

        return {
            ...poster,
            isOwner
        }
    }
)

const makeSelectListPoster = () =>
    createSelector(
        selectListPoster,
        poster => poster
    )

export default makeSelectListPoster
