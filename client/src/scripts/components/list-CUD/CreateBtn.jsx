import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {
    createList,
    loadLists,
    getCurrentUser
} from '../../AC/index'
import {toast} from 'react-toastify'
import popUp from '../decorators/popUp'

class CreateBtn extends Component {
    static propTypes = {
        // from popUp decorator
        setPopUpRef: PropTypes.func.isRequired,
        setToggleBtnRef: PropTypes.func.isRequired,
        togglePopUp: PropTypes.func.isRequired,
        closePopUp: PropTypes.func.isRequired,
        isOpen: PropTypes.bool.isRequired,
        // from connect
        listCreateState: PropTypes.object.isRequired,
        createList: PropTypes.func.isRequired,
        loadLists: PropTypes.func.isRequired,
        getCurrentUser: PropTypes.func.isRequired
    }

    state = {
        value: '',
        // true if request to create list was sent
        isWaitingResponse: false
    }

    setInputRef = node => this.input = node

    componentDidUpdate() {
        if(this.input)
            this.input.focus()
    }

    static getDerivedStateFromProps(props, state) {
        const {listCreateState} = props
        const {isWaitingResponse} = state

        // if list has been created
        if(listCreateState.entity.id && isWaitingResponse) {
            const {title} = listCreateState.entity
            const {loadLists, getCurrentUser, closePopUp} = props

            toast(`created '${title}' list !`)

            loadLists()
            closePopUp()
            // update the lists of current user
            getCurrentUser()

            return {
                isWaitingResponse: false,
                value: ''
            }
        }

        return null
    }

    handleChange = e =>
        this.setState({
            value: e.target.value
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
        const {setToggleBtnRef, togglePopUp, isOpen} = this.props

        return (
            <div className='create-box'>
                <button className='header__btn-create create'
                    ref={setToggleBtnRef}
                    onClick={togglePopUp}
                >
                    + list
                </button>
                {isOpen && this.getForm()}
            </div>
        )
    }

    getForm = () => {
        const {setPopUpRef} = this.props

        return (
            <form className='create__input-box'
                ref={setPopUpRef}
                onSubmit={this.handleSubmit}
            >
                <input className='create__input'
                    value={this.state.value}
                    onChange={this.handleChange}
                    ref={this.setInputRef}
                />
                <button className='create__input-btn'>
                    {'✓'}
                </button>
            </form>
        )
    }
}

export default connect(
    state => ({
        listCreateState: state.listCUD.create
    }), {
        createList,
        loadLists,
        getCurrentUser
    }
)(popUp(CreateBtn))
