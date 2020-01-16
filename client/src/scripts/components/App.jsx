import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'
import ToastContainer from './ToastContainer'
import Header from './Header'
import List from './List'
import Movies from './routes/Movies'
import Form from './Form'
import Lists from './routes/Lists'
import NotFound from './NotFound'
import '../../styles/index.sass'

function App() {
    return (
        <Router>
            <>
                <Route render={props => <Header {...props} />} />
                <main className='content-box'>
                    <Switch>
                        <Route
                            path='/(sing-in|sing-up)/'
                            render={props => <Form {...props} />}
                        />
                        <Route
                            path='/movies'
                            render={props => <Movies {...props} />}
                        />
                        <Route
                            path='/lists'
                            render={props => <Lists {...props} />}
                        />
                        <Route path='/'>
                            <>
                                <List
                                    filters={{
                                        type: 'popular',
                                        page: 1
                                    }}
                                    withSlider
                                    title='Popular now'
                                />
                                <List
                                    filters={{type: 'lists'}}
                                    title='Latest lists'
                                />
                            </>
                        </Route>
                        <Route component={NotFound} />
                    </Switch>
                </main>
                <div className='green-bg'></div>
                <ToastContainer />
            </>
        </Router>
    )
}

export default App
