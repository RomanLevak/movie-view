import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {singOut, checkIfSingedIn} from '../AC/index'

class Header extends Component {

    static propTypes = {
        location: PropTypes.object,
        // from connect
        isSingedIn: PropTypes.bool.isRequired,
        user: PropTypes.object,
        singOut: PropTypes.func,
        checkIfSingedIn: PropTypes.func,
    }

    getUserArea() {
        if(!this.props.isSingedIn)
            return (
                <div className='header__buttons'>
                    <Link
                        to={{
                            pathname: '/sing-in',
                            state: {from: this.props.location}
                        }}
                        className='btn-border header__btn btn-login'>
                        sing in
                    </Link>
                    <Link
                        to={{
                            pathname: '/sing-in',
                            state: {from: this.props.location}
                        }}
                        className='btn-border header__btn btn-singup'>
                            sing up
                    </Link>
                </div>
            )

        return (
            <div className='header__buttons'>
                <div className="header__user">{this.props.user.email}</div>
                <button onClick={this.handleSingOutClick} className="header__singout">
                    <img className='header__singout-img' src="/styles/images/logout.svg" alt=""/>
                </button>
            </div>
        )
    }

    handleSingOutClick = () => {
        const {singOut} = this.props
        singOut()
    }

    render() {
        return (
            <header className='header'>
                <div className='home-icon-box'>
                    <Link to='/'><img className='home-icon' src='/styles/images/robot.svg'/></Link>
                </div>
                <h1 className='header__title'> <Link to = '/'> movieview</Link></h1>
                {this.getUserArea()}
            </header>
        )
    }

    componentDidMount() {
        const {checkIfSingedIn} = this.props
        checkIfSingedIn()
    }
}

export default connect(
    state => ({
        isSingedIn: state.user.isSingedIn,
        user: state.user.entity
    }),
    {singOut, checkIfSingedIn}
)(Header)
