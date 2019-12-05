import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {removeMovieFromList} from '../../AC/index'
import {toast} from 'react-toastify'

class RemoveBtn extends Component {
    static propTypes = {
        movie: PropTypes.object.isRequired,
        listId: PropTypes.string.isRequired,
        // from connect
        removeMovieFromList: PropTypes.func.isRequired,
        // state of list which is being updated
        editedList: PropTypes.object.isRequired
    }

    state = {
        isPromptOpen: false,
        // true if request to remove movie was sent
        isWaitingResponse: false
    }

    componentWillUnmount() {
        document.removeEventListener(
            'mousedown',
            this.handleClickOutside
        )
    }

    componentDidMount() {
        document.addEventListener(
            'mousedown',
            this.handleClickOutside
        )
    }

    static getDerivedStateFromProps(props, state) {
        const {editedList} = props
        const {isWaitingResponse} = state

        // if a movie has been removed from list
        if(editedList.entity.id && isWaitingResponse) {
            const {title} = props.movie

            toast(`'${title}' was removed from list !`)

            return {
                isWaitingResponse: false,
                isPromptOpen: false,
            }
        }

        return null
    }

    setPromptRef = node => this.promptRef = node

    setBtnRef = node => this.btnRef = node

    togglePrompt = () =>
        this.setState({
            isPromptOpen: !this.state.isPromptOpen
        })

    handleSubmit = e => {
        e.preventDefault()
        this.togglePrompt()
    }

    handleClickOutside = e => {
        if(
            this.promptRef &&
            !this.promptRef.contains(e.target) &&
            e.target !== this.btnRef
        )
            this.setState({isPromptOpen: false})
    }

    removeMovieFromList = () => {
        const {removeMovieFromList, movie, listId} = this.props

        this.setState({isWaitingResponse: true})
        removeMovieFromList(listId, movie.id)
    }

    getPrompt = () =>
        <form className='remove-prompt'
            ref={this.setPromptRef}
            onSubmit={this.handleSubmit}
        >
            <span className='remove__text'>Are you sure ?</span>
            <div className="remove__btns-box">
                {/* 'no' goes first for handling 'enter' key */}
                <button
                    className='remove-prompt__btn remove-prompt__btn-no'
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

    render() {
        const {isPromptOpen} = this.state

        return (
            <div className='remove-box'>
                <button className='remove-btn'
                    ref={this.setBtnRef}
                    onClick={this.togglePrompt}
                >
                    {'✖'}
                </button>
                { isPromptOpen ?
                    this.getPrompt() :
                    null
                }
            </div>
        )
    }
}

export default connect(
    state => ({
        editedList: state.listCUD.removeMovie
    }),
    {removeMovieFromList}
)(RemoveBtn)
