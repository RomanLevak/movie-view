import {createSelector} from 'reselect'

const getUser = state => state.user

const selectUser = createSelector(
    getUser,
    user => {
        if(user.entity)
            return {
                name: user.entity.displayName,
                email: user.entity.email,
                id: user.entity.id,
                loading: user.loading,
                error: user.error
            }

        return {
            loading: user.loading,
            error: user.error
        }
    }
)

export default selectUser
