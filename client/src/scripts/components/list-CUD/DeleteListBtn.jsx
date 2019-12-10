import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {deleteList, loadList} from '../../AC/index'
import {toast} from 'react-toastify'
import popUp from '../decorators/popUp'

class DeleteListBtn extends Component {
    static propTypes = {
        list: PropTypes.object.isRequired,
        // from popUp decorator
        setPopUpRef: PropTypes.func.isRequired,
        setToggleBtnRef: PropTypes.func.isRequired,
        openPopUp: PropTypes.func.isRequired,
        closePopUp: PropTypes.func.isRequired,
        isOpen: PropTypes.bool.isRequired,
        // from connect
        deleteListState: PropTypes.object.isRequired,
        deleteList: PropTypes.func.isRequired,
        loadList: PropTypes.func.isRequired
    }

    state = {
        isWaitingResponse: false
    }

    static getDerivedStateFromProps(props, state) {
        const {deleteListState} = props
        const {isWaitingResponse} = state

        // if a list has been deleted
        if(deleteListState.entity.id && isWaitingResponse) {
            const {closePopUp, loadList, list} = props
            const {title} = props.list

            toast(`'${title}' was deleted !`)

            loadList(list.id)
            closePopUp()

            return {
                isWaitingResponse: false,
            }
        }

        return null
    }

    deleteList = () => {
        const {deleteList, list} = this.props
        const {id} = list

        this.setState({isWaitingResponse: true})
        deleteList(id)
    }

    render() {
        const {setToggleBtnRef, openPopUp, isOpen} = this.props

        return (
            <>
                <button className='delete__btn-box'
                    ref={setToggleBtnRef}
                    onClick={openPopUp}
                >
                    <img src='/styles/images/delete.svg' />
                </button>
                {isOpen && this.getPrompt()}
            </>
        )
    }

    getPrompt = () =>
        <div className='delete__prompt-box'
            onClick={this.props.closePopUp}
        >
            <div className='delete__prompt'>
                <span className='delete-prompt__text'>
                Are you sure want to delete{' \''}
                    <span className='delete-prompt__title'>
                        {`${this.props.list.title}`}
                    </span>
                    {'\' '}?
                </span>
                <div className='delete-prompt__buttons-box'>
                    <button className='delete-prompt__btn delete-prompt__btn-no'
                        onClick={this.props.closePopUp}
                    >
                    no
                    </button>
                    <button className='delete-prompt__btn delete-prompt__btn-yes'
                        onClick={this.deleteList}
                    >
                    yes
                    </button>
                </div>
            </div>
        </div>
}

export default connect(
    state => ({
        deleteListState: state.listCUD.delete
    }), {
        deleteList,
        loadList
    }
)(popUp(DeleteListBtn))
