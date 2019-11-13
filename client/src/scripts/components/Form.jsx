import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Redirect, NavLink} from 'react-router-dom'
import {singIn, singUp} from '../AC/index'

class Form extends Component {

    static contextTypes = {
        router: PropTypes.object,
    }

    static propTypes = {
        location: PropTypes.object,
        match: PropTypes.object,
        // from connect
        singIn: PropTypes.func.isRequired,
        singUp: PropTypes.func.isRequired,
        isSingedIn: PropTypes.bool.isRequired,
        loading: PropTypes.bool,
        user: PropTypes.object,
        error: PropTypes.string
    }

    state = {
        isBLocking: false,
        email: '',
        username: '',
        password: ''
    }

    handleInputChange = e => {
        const {name, value} = e.target

        this.setState({
            [name]: value
        })
    }

    handleSubmit = e => {
        e.preventDefault()

        const {name} = e.target

        if(name == 'sing in') {
            const {singIn} = this.props
            const {email, password} = this.state
            singIn(email, password)
        } else {
            const {singUp} = this.props
            const {email, username, password} = this.state
            singUp(email, username, password)
        }
    }

    getStatusArea = () => {
        if(this.props.error)
            return <span className="error-msg">{this.props.error}</span>

        if(this.props.isSingedIn)
            return `you are singed in as ${this.props.user.email}`

        if(this.props.loading)
            return 'loading...'

        return null
    }

    getFieldset = () => {
        const {url} = this.props.match
        const type = url.includes('sing-in') ? 'sing in' : 'sing up'

        return (
            <fieldset className='form__field-box'>
                <div className='form__field'>
                    <label htmlFor="user_email">email</label>
                    <input className='form__field form__text-input'
                        id='user_email'
                        type="email"
                        name='email'
                        value={this.state.email}
                        onChange={this.handleInputChange}
                    />
                </div>
                {
                    type == 'sing up'
                        ?
                        <div className='form__field'>
                            <label htmlFor="userName">username</label>
                            <input className='form__text-input'
                                id='username'
                                type="text"
                                name='username'
                                value={this.state.username}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        :
                        null
                }
                <div className='form__field'>
                    <label htmlFor="userPassword">password</label>
                    <input className='form__text-input'
                        id='user_password'
                        type="password"
                        name='password'
                        value={this.state.password}
                        onChange={this.handleInputChange}
                    />
                </div>
                <div className="form__status form__status-box">
                    {this.getStatusArea()}
                </div>
                <div className="form__buttons-wrap">
                    <input className='form__button'
                        type='submit'
                        value={type}
                        name={type}
                        onClick = {this.handleSubmit}
                    />
                </div>
            </fieldset>
        )
    }

    render() {
        if(this.props.isSingedIn) {
            try {
                const {from} = this.props.location.state
                return <Redirect to={from} />
            } catch (err) {
                return <Redirect to='/' />
            }
        }

        return (
            <form className='form form-box'
                onSubmit={this.handleSubmit}
            >
                <div className="form__tabs form__tabs-box">
                    <NavLink
                        to = '/sing-in'
                        type="button"
                        className='form__tabs-btn'
                        activeClassName='form__tabs-btn-active'
                    >
                        sing in
                    </NavLink>
                    <NavLink
                        to = '/sing-up'
                        type="button"
                        className='form__tabs-btn'
                        activeClassName='form__tabs-btn-active'
                    >
                        sing up
                    </NavLink>
                </div>
                {this.getFieldset()}
            </form>
        )
    }
}

export default connect(
    state => ({
        isSingedIn: state.user.isSingedIn,
        loading: state.user.loading,
        error: state.user.error,
        user: state.user.entity
    }),
    {singIn, singUp}
)(Form)
