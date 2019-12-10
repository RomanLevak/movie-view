import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {updateList} from '../../AC/index'
import {toast} from 'react-toastify'

class EditableTitle extends Component {

    static propTypes = {
        list: PropTypes.object,
        // from connect
        listUpdateState: PropTypes.object.isRequired,
        updateList: PropTypes.func.isRequired,
        loadLists: PropTypes.func
    }

    state = {
        isInputOpen: false,
        isWaitingResponse: false,
        value: this.props.list.title
    }

    setTitleInputRef = node => this.titleInput = node

    componentDidUpdate = () => {
        if(this.titleInput)
            this.titleInput.focus()
    }

    handleChange = e =>
        this.setState({value: e.target.value})

    static getDerivedStateFromProps(props, state) {
        const {listUpdateState} = props
        const {isWaitingResponse} = state

        if(listUpdateState.entity.id && isWaitingResponse) {
            const newTitle = listUpdateState.entity.title

            toast(`Title was updated to '${newTitle}'`)

            return {
                isInputOpen: false,
                isWaitingResponse: false,
                value: newTitle
            }
        }

        return null
    }

    handleSubmit = e => {
        e.preventDefault()

        const {updateList} = this.props
        const {id} = this.props.list

        const title = this.state.value

        this.setState({
            isWaitingResponse: true
        })

        updateList(id, [{
            propName: 'title',
            value: title
        }])
    }

    makeEditable = e => {
        e.preventDefault()
        this.setState({isInputOpen: true})
    }

    getStaticBody = () =>
        <>
            <h2 className='list__title'>
                {this.state.value}
            </h2>
            <button className='list__title-edit'
                onClick={this.makeEditable}
            >
                {'🖉'}
            </button>
        </>

    render() {
        const {isInputOpen} = this.state

        return (
            <form className='editable-title__form'
                onSubmit={this.handleSubmit}
            >
                { isInputOpen ?
                    this.getEditableBody() :
                    this.getStaticBody()
                }
            </form>
        )
    }

    getEditableBody = () =>
        <>
            <h2 className='list__title'>
                <input className='list__title-input'
                    ref={this.setTitleInputRef}
                    value={this.state.value}
                    onChange={this.handleChange}
                />
            </h2>
            <button className='list__title-edit seagreen'>
                {'✓'}
            </button>
        </>
}

export default connect(
    state => ({
        listUpdateState: state.listCUD.update
    }),
    {updateList}
)(EditableTitle)
