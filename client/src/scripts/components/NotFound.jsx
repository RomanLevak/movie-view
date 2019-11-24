import React from 'react'
import {Link} from 'react-router-dom'

function NotFound() {
    return (
        <div className='not-found-box'>
            <div className='not-found__icon-box'>
                <span className='not-found__icon'>404</span>
            </div>
            <p className='not-found__text not-found__text-box'>
                Sorry, the page could not be found
            </p>
            <Link to='/' className='not-found__link'>
                {'>> go to Homepage'}
            </Link>
        </div>
    )
}

export default NotFound
