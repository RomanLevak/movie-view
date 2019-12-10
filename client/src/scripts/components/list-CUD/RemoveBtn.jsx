import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {removeMovieFromList, loadList} from '../../AC/index'
import {toast} from 'react-toastify'
import popUp from '../decorators/popUp'

class RemoveBtn extends Component {
    static propTypes = {
        movie: PropTypes.object.isRequired,
        listId: PropTypes.string.isRequired,
        // from popUp decorator
        setPopUpRef: PropTypes.func.isRequired,
        setToggleBtnRef: PropTypes.func.isRequired,
        togglePopUp: PropTypes.func.isRequired,
        closePopUp: PropTypes.func.isRequired,
        isOpen: PropTypes.bool.isRequired,
        // from connect
        removeMovieFromList: PropTypes.func.isRequired,
        loadList: PropTypes.func.isRequired,
        // state of list which is being updated
        editedList: PropTypes.object.isRequired
    }

    state = {
        // true if request to remove movie was sent
        isWaitingResponse: false
    }

    static getDerivedStateFromProps(props, state) {
        const {editedList} = props
        const {isWaitingResponse} = state

        // if a movie has been removed from list
        if(editedList.entity.id && isWaitingResponse) {
            const {closePopUp, loadList, listId} = props
            const {title} = props.movie

            toast(`'${title}' was removed from list !`)

            loadList(listId)
            closePopUp()

            return {
                isWaitingResponse: false,
            }
        }

        return null
    }

    handleSubmit = e => {
        e.preventDefault()
        this.props.closePopUp()
    }

    removeMovieFromList = () => {
        const {removeMovieFromList, movie, listId} = this.props

        this.setState({isWaitingResponse: true})
        removeMovieFromList(listId, movie.id)
    }

    render() {
        const {setToggleBtnRef, togglePopUp, isOpen} = this.props

        return (
            <div className='remove-box'>
                <button className='remove-btn'
                    ref={setToggleBtnRef}
                    onClick={togglePopUp}
                >
                    {'✖'}
                </button>
                {isOpen && this.getPrompt()}
            </div>
        )
    }

    getPrompt = () =>
        <form className='remove-prompt'
            ref={this.props.setPopUpRef}
            onSubmit={e => e.preventDefault()}
        >
            <span className='remove__text'>Are you sure ?</span>
            <div className="remove__btns-box">
                {/* 'no' goes first for handling 'enter' key */}
                <button
                    className='remove-prompt__btn remove-prompt__btn-no'
                    onClick={this.handleSubmit}
                >
                no
                </button>
                <button
                    className='remove-prompt__btn remove-prompt__btn-yes'
                    onClick={this.removeMovieFromList}
                >
                yes
                </button>
            </div>
        </form>
}

export default connect(
    state => ({
        editedList: state.listCUD.removeMovie
    }), {
        removeMovieFromList,
        loadList
    }
)(popUp(RemoveBtn))
