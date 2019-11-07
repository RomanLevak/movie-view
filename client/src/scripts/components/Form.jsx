import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {singIn, singUp} from '../AC/index'

class Form extends Component {

    static contextTypes = {
        router: PropTypes.object,
    }

    static propTypes = {
        location: PropTypes.object,
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
        password: ''
    }

    handleEmailChange = e =>
        this.setState({
            email: e.target.value
        })

    handlePasswordChange = e =>
        this.setState({
            password: e.target.value
        })

    handleSingInClick = e => {
        e.preventDefault()

        const {singIn} = this.props
        const {email, password} = this.state
        singIn(email, password)
    }

    handleSingUpClick = e => {
        e.preventDefault()

        const {singUp} = this.props
        const {email, password} = this.state
        singUp(email, password)
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
                <fieldset className='form__field-box'>
                    <fieldset className='form__field'>
                        <label htmlFor="user_email">Email</label>
                        <input className='form__field form__text-input'
                            id='user_email'
                            type="email"
                            value={this.state.email}
                            onChange={this.handleEmailChange}
                        />
                    </fieldset>
                    <fieldset className='form__field'>
                        <label htmlFor="userPassword">Password</label>
                        <input className='form__text-input'
                            id='user_password'
                            type="password"
                            value={this.state.password}
                            onChange={this.handlePasswordChange}
                        />
                    </fieldset>
                    <div className="form__status form__status-box">
                        {this.getStatusArea()}
                    </div>
                    <div className="form__buttons-wrap">
                        <input className='form__button' type='submit'
                            value='singIn'
                            onClick = {this.handleSingInClick}
                        />
                        <input className='form__button' type='submit'
                            value='singup'
                            onClick = {this.handleSingUpClick}
                        />
                    </div>
                </fieldset>
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
