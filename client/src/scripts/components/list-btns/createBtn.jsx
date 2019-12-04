import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {createList, resetCreateList} from '../../AC/index'

class CreateBtn extends Component {
    static propTypes = {
        // from connect
        listCreate: PropTypes.object.isRequired,
        createList: PropTypes.func.isRequired
    }

    state = {
        value: '',
        isInputOpen: false,
        isListCreated: false,
        // true if request to create list was sent
        isWaitingResponse: false
    }

    setInputRef = el =>
        this.input = el

    componentDidUpdate() {
        if(this.state.isInputOpen)
            this.input.focus()
    }

    static getDerivedStateFromProps(props, state) {
        const {listCreate} = props
        const {isWaitingResponse} = state

        if(listCreate.entity && isWaitingResponse)
            return {
                isWaitingResponse: false,
                isInputOpen: false,
                isListCreated: true
            }

        return null
    }

    onBlur = () => {
        setTimeout(
            () => this.setState({isInputOpen: false}),
            0
        )
    }

    handleChange = e =>
        this.setState({
            value: e.target.value
        })

    toggleInput = () =>
        this.setState({
            isInputOpen: !this.state.isInputOpen
        })

    handleSubmit = e => {
        e.preventDefault()

        const {createList} = this.props
        const title = this.state.value

        this.setState({
            isWaitingResponse: true
        })

        createList(title)
    }

    render() {
        const {isInputOpen} = this.state

        return (
            <div className='create-box'>
                <button className='header__btn-create create'
                    onClick={this.toggleInput}
                >
                    + list
                </button>
                { isInputOpen ?
                    <form className='create__input-box'
                        onBlur={this.onBlur}
                        onSubmit={this.handleSubmit}
                    >
                        <input className='create__input'
                            value={this.state.value}
                            onChange={this.handleChange}
                            ref={this.setInputRef}
                        />
                        <button className='create__input-btn'
                            /*
                             * prevent from onBlur event which would
                             * hide a Form and redirection wouldn't happen
                             */
                            onMouseDown = {e => e.preventDefault()}
                        >
                            {'✓'}
                        </button>
                    </form>
                    :
                    null
                }
            </div>
        )
    }
}

export default connect(
    state => ({
        listCreate: state.listCUD.create
    }), {
        createList,
        resetCreateList
    }
)(CreateBtn)
