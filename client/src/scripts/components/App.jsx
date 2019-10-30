import React, {Component, Fragment} from 'react'
import Header from './Header'
import Search from './Search'
import HomeList from './HomeList'
import Movies from './routes/Movies'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Form from './Form'
import '../../styles/index.sass'

class App extends Component {
    render() {
        return (
            <Router>
                <Fragment>
                    <Header />
                    <main className='content-box full-height'>
                        <Search />
                        <Switch>
                            <Route path='/login' render = {() => <Form />} />
                            <Route path='/sing-up' render = {() => <Form />} />
                            <Route path = '/movies' render = {() => <Movies />} />
                            <Route path='/' render = {() => <HomeList/>} />
                        </Switch>
                    </main>
                    <div className="green-bg"></div>
                </Fragment>
            </Router>
        )
    }
}

export default App
