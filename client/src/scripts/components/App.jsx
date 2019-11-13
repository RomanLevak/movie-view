import React, {Component, Fragment} from 'react'
import Header from './Header'
import Search from './Search'
import HomeList from './HomeList'
import Movies from './routes/Movies'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Form from './Form'
import NotFound from './NotFound'
import '../../styles/index.sass'

class App extends Component {
    render() {
        return (
            <Router>
                <Fragment>
                    <Route render = {props => <Header {...props} />} />
                    <main className='content-box'>
                        <Search />
                        <Switch>
                            <Route
                                path='/(sing-in|sing-up)/'
                                render = {props => <Form {...props} />}
                            />
                            <Route path = '/movies' render = {props => <Movies {...props} />} />
                            <Route path='/' exact render = {() => <HomeList/>} />
                            <Route component={NotFound} />
                        </Switch>
                    </main>
                    <div className="green-bg"></div>
                </Fragment>
            </Router>
        )
    }
}

export default App
