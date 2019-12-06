import {createSelector} from 'reselect'

const getLists = state => state.lists

const selectLists = createSelector(
    getLists,
    lists => lists
)

export default selectLists
