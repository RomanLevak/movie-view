import React from 'react'
import PropTypes from 'prop-types'
import {default as RawSlider} from 'react-slick'
import 'slick-carousel/slick/slick.css'

function Arrow(props) {
    const {style, onClick, next} = props

    return (
        <div
            className = {
                next ?
                    'home-list__next-arrow' :
                    'home-list__prev-arrow'
            }
            style={{...style, display: 'block'}}
            onClick={onClick}
        >
            <img src='/styles/images/arrow.svg'/>
        </div>
    )
}

Arrow.propTypes = {
    style: PropTypes.object,
    onClick: PropTypes.func,
    next: PropTypes.bool
}

function Slider(props) {
    const settings = {
        dots: false,
        infinite: true,
        speed: 1100,
        slidesToShow: 6,
        slidesToScroll: 6,
        nextArrow: <Arrow next />,
        prevArrow: <Arrow />
    }

    return (
        <RawSlider className='flex-center' {...settings}>
            {props.children}
        </RawSlider>
    )
}

Slider.propTypes = {
    children: PropTypes.node.isRequired
}

export default Slider
