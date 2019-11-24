import React from 'react'
import PropTypes from 'prop-types'

function Loader(props) {
    const {type} = props

    if(type != 'spinner')
        return (
            <div className='loader-box'>
                <ul className='loader'>
                    <li className='loader__square'></li>
                    <li className='loader__square'></li>
                    <li className='loader__square'></li>
                    <li className='loader__square'></li>
                    <li className='loader__square'></li>
                    <li className='loader__square'></li>
                </ul>
            </div>
        )

    return (
        <div className='loader-box'>
            <div className='loader-spinner'></div>
        </div>
    )
}

Loader.propTypes = {
    type: PropTypes.oneOf(['spinner', 'squares'])
}

export default Loader
