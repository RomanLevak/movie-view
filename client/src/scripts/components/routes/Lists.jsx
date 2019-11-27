import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Route, Switch} from 'react-router-dom'
import Explorer from '../Explorer'
import ListInfo from '../ListInfo'

class Lists extends Component {

    static propTypes = {
        match: PropTypes.object.isRequired
    }

    render() {
        const {url} = this.props.match

        return (
            <Switch>
                <Route path = {`${url}/author/:authorName`}
                    render = {this.getExplorerForLists}
                />
                <Route path = {`${url}/:id`}
                    render = {this.getListInfo}
                />
                <Route path = {`${url}`}
                    render = {this.getExplorerForLists}
                />
            </Switch>
        )
    }

    getExplorerForLists = ({match}) => {
        const {authorName} = match.params

        if(authorName)
            return (
                <Explorer
                    type='lists'
                    filters = {{authorName}}
                    key = {authorName}
                />
            )

        return <Explorer type='lists' />
    }

    getListInfo = ({match}) => {
        const {id} = match.params

        return <ListInfo id = {id} />
    }
}

export default Lists
