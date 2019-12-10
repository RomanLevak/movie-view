import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import selectUser from '../../selectors/user'
import {addMovieToList, loadList} from '../../AC/index'
import {toast} from 'react-toastify'
import popUp from '../decorators/popUp'

class AddBtn extends Component {
    static propTypes = {
        movieId: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]).isRequired,
        // from popUp decorator
        setPopUpRef: PropTypes.func.isRequired,
        setToggleBtnRef: PropTypes.func.isRequired,
        togglePopUp: PropTypes.func.isRequired,
        closePopUp: PropTypes.func.isRequired,
        isOpen: PropTypes.bool.isRequired,
        // from connect
        lists: PropTypes.array.isRequired,
        addMovieToList: PropTypes.func.isRequired,
        loadList: PropTypes.func.isRequired,
        // state of list which is being updateds
        editedList: PropTypes.object.isRequired
    }

    state = {
        // true if request to add movie was sent
        isWaitingResponse: false,
        // id of list which is being updated
        listId: null
    }

    static getDerivedStateFromProps(props, state) {
        const {editedList} = props
        const {isWaitingResponse} = state

        // if a movie has been added to list
        if(editedList.entity.id && isWaitingResponse) {
            const {title} = editedList.entity
            const {loadList, closePopUp} = props

            toast(`movie was added to '${title}' !`)

            loadList(state.listId)
            closePopUp()

            return {
                isWaitingResponse: false
            }
        }

        return null
    }

    addMovieToList = e => {
        const {addMovieToList, movieId} = this.props
        const {listId} = e.target.dataset

        this.setState({
            isWaitingResponse: true,
            listId
        })

        addMovieToList(listId, movieId)
    }

    render() {
        const {setToggleBtnRef, togglePopUp, isOpen} = this.props

        return (
            <div className='add-box'>
                <button className='add-btn'
                    ref={setToggleBtnRef}
                    onClick={togglePopUp}
                >
                    +
                </button>
                {isOpen && this.getMenu()}
            </div>
        )
    }

    getMenu = () => {
        const {lists, setPopUpRef} = this.props
        let dataHeader = ''
        let menuItems = []

        if(lists.length) {
            dataHeader = 'add to list:'

            lists.map(list => menuItems.push(
                <li className='add-menu__item'
                    key={list.id}
                    data-list-id={list.id}
                    onClick={this.addMovieToList}
                >
                    {list.title}
                </li>
            ))
        }
        else
            dataHeader = 'you have no lists'

        return (
            <ul className='add-menu-box add-menu'
                data-header={dataHeader}
                ref={setPopUpRef}
            >
                {menuItems}
            </ul>
        )
    }
}

export default connect(
    state => ({
        lists: selectUser(state).entity.lists,
        editedList: state.listCUD.addMovie
    }), {
        addMovieToList,
        loadList
    }
)(popUp(AddBtn))
