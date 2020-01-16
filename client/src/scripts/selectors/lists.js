import {createSelector} from 'reselect'
import {mapToArr} from '../helpers'

const getLists = state => state.lists

const selectLists = createSelector(
    getLists,
    lists => ({
        entities: mapToArr(lists.entities),
        loading: lists.loading,
        loaded: lists.loaded,
        error: lists.error,
        totalPages: lists.totalPages
    })
)

export default selectLists
