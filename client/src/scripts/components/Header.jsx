import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import selectUser from '../selectors/user'
import {singOut, checkIfSingedIn} from '../AC/index'
import CreateBtn from './createBtn'
import Search from './Search'

class Header extends Component {

    static propTypes = {
        location: PropTypes.object,
        // from connect
        user: PropTypes.object,
        singOut: PropTypes.func.isRequired,
        checkIfSingedIn: PropTypes.func.isRequired,
    }

    componentDidMount() {
        const {checkIfSingedIn} = this.props
        checkIfSingedIn()
    }

    handleSingOutClick = () => {
        const {singOut} = this.props
        singOut()
    }

    getUserArea() {
        if(this.props.user.name) { // user is signed in
            const {user} = this.props
            const {name} = user

            return (
                <div className='header__buttons'>
                    <CreateBtn />
                    <div className='header__user'>
                        <Link to={`/lists/author/${name}`}>
                            {name}
                        </Link>
                    </div>
                    <button
                        className='header__singout'
                        onClick={this.handleSingOutClick}
                    >
                        <img
                            className='header__singout-img'
                            src='/styles/images/logout.svg'
                        />
                    </button>
                </div>
            )
        }

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
                        pathname: '/sing-up',
                        state: {from: this.props.location}
                    }}
                    className='btn-border header__btn btn-singup'>
                        sing up
                </Link>
            </div>
        )
    }

    render() {
        return (
            <header className='header'>
                <div className='home-icon-box'>
                    <Link to='/'>
                        <img
                            className='home-icon'
                            src='/styles/images/robot.svg'
                        />
                    </Link>
                </div>
                <h1 className='header__title'>
                    <Link to = '/'> movieview</Link>
                </h1>
                <Search />
                {this.getUserArea()}
            </header>
        )
    }
}

export default connect(
    state => ({user: selectUser(state)}),
    {singOut, checkIfSingedIn}
)(Header)
