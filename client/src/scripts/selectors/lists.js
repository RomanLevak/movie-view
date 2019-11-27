import {createSelector} from 'reselect'

const getLists = state => state.lists

const selectLists = createSelector(
    getLists,
    lists => ({
        entities: lists.entities,
        loading: lists.loading,
        loaded: lists.loaded,
        error: lists.error
    })
)

export default selectLists
