import React, {Component} from 'react'

class Form extends Component {
    render() {
        return (
            <form className='form form-box'>
                <fieldset className='form__field-box'>
                    <fieldset className='form__field'>
                        <label htmlFor="user_email">Email</label>
                        <input className='form__field form__text-input'
                            id='user_email'
                            type="email"
                        />
                    </fieldset>
                    <fieldset className='form__field'>
                        <label htmlFor="userPassword">Password</label>
                        <input className='form__text-input'
                            id='user_password'
                            type="password"
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
