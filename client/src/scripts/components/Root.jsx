import React from 'react'
import App from './App'
import store from '../store/index'
import {Provider} from 'react-redux'

function Root() {
    return (
        <Provider store = {store}>
            <App />
        </Provider>
    )
}

export default Root
