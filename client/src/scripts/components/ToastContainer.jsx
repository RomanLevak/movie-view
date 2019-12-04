import React from 'react'
import {ToastContainer as RawToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function ToastContainer() {
    return (
        <div>
            <RawToastContainer
                toastClassName='toast__item-box'
                bodyClassName='toast__item'
                position='bottom-right'
                closeButton={false}
                progressStyle={{visibility: 'hidden'}}
                autoClose={2300}
                draggable={false}
            />
        </div>
    )
}

export default ToastContainer
