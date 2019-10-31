import React, {Component} from 'react'

class Form extends Component {
    state = {
        email: '',
        password: ''
    }

    handleEmailChange = e =>
        this.setState({email: e.target.value})

    handlePasswordChange = e =>
        this.setState({password: e.target.value})

    render() {
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
                    <div className="form__buttons-wrap">
                        <input className='form__button' type='submit' value='Login' />
                        <input className='form__button' type='submit' value='sing up' />
                    </div>
                </fieldset>
            </form>
        )
    }
}

export default Form
