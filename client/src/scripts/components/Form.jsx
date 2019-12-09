import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Redirect, NavLink} from 'react-router-dom'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import {connect} from 'react-redux'
import selectUser from '../selectors/user'
import {singIn, singUp} from '../AC/index'

class Form extends Component {

    static propTypes = {
        location: PropTypes.object,
        match: PropTypes.object,
        // from connect
        singIn: PropTypes.func.isRequired,
        singUp: PropTypes.func.isRequired,
        user: PropTypes.shape({
            entity: PropTypes.object,
            loading: PropTypes.bool,
            error: PropTypes.string
        }).isRequired
    }

    state = {
        email: '',
        username: '',
        password: ''
    }

    handleInputChange = e => {
        const {id, value} = e.target

        this.setState({
            [id]: value
        })
    }

    handleSubmit = e => {
        e.preventDefault()

        const {value} = e.target

        if(value == 'sing in') {
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
        const {loading, error} = this.props.user

        if(error)
            return (
                <span className='error-msg'>
                    {error}
                </span>
            )

        if(loading)
            return 'loading...'

        return null
    }

    render() {
        // if user is signed in
        if(this.props.user.entity.id) {
            try {
                const {from} = this.props.location.state
                return <Redirect to={from} />
            } catch (error) {
                return <Redirect to='/' />
            }
        }

        const {url} = this.props.match
        const type = url.includes('sing-in') ?
            'sing in' :
            'sing up'

        return (
            <form className='form form-box'
                onSubmit={this.handleSubmit}
            >
                <div className='form__tabs form__tabs-box'>
                    <NavLink className='form__tabs-btn'
                        activeClassName='form__tabs-btn-active'
                        type='button'
                        to='/sing-in'
                    >
                        sing in
                    </NavLink>
                    <NavLink className='form__tabs-btn'
                        activeClassName='form__tabs-btn-active'
                        type='button'
                        to='/sing-up'
                    >
                        sing up
                    </NavLink>
                </div>
                <TransitionGroup className='form__fieldset-wrap'
                    appear={false} exit enter
                >
                    { type == 'sing in' ?
                        <CSSTransition classNames='slide_and_scale-right'
                            key={type}
                            in appear timeout={150}
                        >
                            {this.getSingInFieldset()}
                        </CSSTransition>
                        :
                        <CSSTransition classNames='slide_and_scale-left'
                            key={type}
                            in appear timeout={150}
                        >
                            {this.getSingUpFieldset()}
                        </CSSTransition>
                    }
                </TransitionGroup>
            </form>
        )
    }

    getSingUpFieldset = () =>
        <fieldset className='form__fieldset-box'>
            <div className='form__field'>
                <label htmlFor='email'>Email</label>
                <input
                    className='form__field form__text-input'
                    id='email'
                    type='email'
                    value={this.state.email}
                    onChange={this.handleInputChange}
                />
            </div>
            <div className='form__field'>
                <label htmlFor='userName'>
                    username
                </label>
                <input className='form__text-input'
                    id='username'
                    type='text'
                    value={this.state.username}
                    onChange={this.handleInputChange}
                />
            </div>
            <div className='form__field'>
                <label htmlFor='userPassword'>
                    password
                </label>
                <input className='form__text-input'
                    type='password'
                    id='password'
                    value={this.state.password}
                    onChange={this.handleInputChange}
                />
            </div>
            <div className='form__status form__status-box'>
                {this.getStatusArea()}
            </div>
            <div className='form__buttons-wrap'>
                <input className='form__button'
                    type='submit'
                    value='sing up'
                    onClick={this.handleSubmit}
                />
            </div>
        </fieldset>

getSingInFieldset = () =>
    <fieldset className='form__fieldset-box'>
        <div className='form__field'>
            <label htmlFor='email'>Email</label>
            <input
                className='form__field form__text-input'
                id='email'
                type='email'
                value={this.state.email}
                onChange={this.handleInputChange}
            />
        </div>
        <div className='form__field'>
            <label htmlFor='userPassword'>
                password
            </label>
            <input className='form__text-input'
                type='password'
                id='password'
                value={this.state.password}
                onChange={this.handleInputChange}
            />
        </div>
        <div className='form__status form__status-box'>
            {this.getStatusArea()}
        </div>
        <div className='form__buttons-wrap'>
            <input className='form__button'
                type='submit'
                value='sing in'
                onClick={this.handleSubmit}
            />
        </div>
    </fieldset>
}

export default connect(
    state => ({user: selectUser(state)}),
    {singIn, singUp}
)(Form)
