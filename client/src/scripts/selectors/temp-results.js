import {createSelector} from 'reselect'
import {mapToArr} from '../helpers'

const getSearch = state => state.search

export default createSelector(
    getSearch,
    search => mapToArr(search.tempResults)
)
