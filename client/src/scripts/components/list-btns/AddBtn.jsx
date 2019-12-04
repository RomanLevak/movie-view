import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import selectUser from '../../selectors/user'
import {addMovieToList} from '../../AC/index'

class AddBtn extends Component {
    static propTypes = {
        movieId: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]).isRequired,
        // from connect
        lists: PropTypes.array.isRequired,
        addMovieToList: PropTypes.func.isRequired,
        // state of list which is being updated
        editedList: PropTypes.object.isRequired
    }

    state = {
        isMenuOpen: false,
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

        if(editedList.entity && isWaitingResponse)
            return {
                isWaitingResponse: false,
                isMenuOpen: false,
            }

        return null
    }

    setMenuRef = node => this.menuRef = node

    setBtnRef = node => this.btnRef = node

    handleClickOutside = e => {
        if(
            this.menuRef &&
            !this.menuRef.contains(e.target) &&
            e.target !== this.btnRef
        )
            this.setState({isMenuOpen: false})
    }

    addMovieToList = e => {
        const {addMovieToList, movieId} = this.props
        const {listId} = e.target.dataset

        this.setState({isWaitingResponse: true})
        addMovieToList(listId, movieId)
    }

    toggleMenu = () =>
        this.setState({
            isMenuOpen: !this.state.isMenuOpen
        })

    getMenu = () => {
        const {lists} = this.props
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
                ref={this.setMenuRef}
            >
                {menuItems}
            </ul>
        )
    }

    render() {
        const {isMenuOpen} = this.state

        return (
            <div className='add-box'>
                <button className='add-btn'
                    ref={this.setBtnRef}
                    onClick={this.toggleMenu}
                >
                    +
                </button>
                { isMenuOpen ?
                    this.getMenu() :
                    null
                }
            </div>
        )
    }
}

export default connect(
    state => ({
        lists: selectUser(state).entity.lists,
        editedList: state.listCUD.addMovie
    }),
    {addMovieToList}
)(AddBtn)
