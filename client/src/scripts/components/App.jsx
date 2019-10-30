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
                            <Route path='/login' component = {() => <Form />}/>
                            <Route path='/sing-up' component = {() => <Form />}/>
                            <Route path = '/movies' component = {() => <Movies />} />
                            <Route path='/' component={() => <HomeList/>} />
                        </Switch>
                    </main>
                    <div className="green-bg"></div>
                </Fragment>
            </Router>
        )
    }
}

export default App
