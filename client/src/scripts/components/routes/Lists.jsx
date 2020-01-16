import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Route, Redirect, Switch} from 'react-router-dom'
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
                <Route path={`${url}/author/:authorName/:page`}
                    render={this.getExplorerForLists}
                />
                <Route path={`${url}/author/:authorName`}
                    render={this.getExplorerForLists}
                />
                <Route path={`${url}/latest/:page`}
                    render={this.getExplorerForLists}
                />
                <Route path={`${url}/latest`}
                    render={this.getExplorerForLists}
                />
                <Route path={`${url}/:id`}
                    render={this.getListInfo}
                />
                <Route path={`${url}`}
                    render={this.getExplorerForLists}
                />
            </Switch>
        )
    }

    getExplorerForLists = ({match}) => {
        const {authorName, page} = match.params
        const {url} = match

        if(!page) {
            if(url.match(/(latest|author)/))
                return <Redirect to={`${url}/1`} />
            else
                return <Redirect to={`${url}/latest/1`} />
        }

        return (
            <Explorer key={authorName || 'latest'}
                filters={{
                    type: 'lists',
                    authorName,
                    page: parseInt(page)
                }}
            />
        )
    }

    getListInfo = ({match}) => {
        const {id} = match.params

        return <ListInfo id={id} />
    }
}

export default Lists
