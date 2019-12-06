import React, {Component} from 'react'

function popUp(RawComponent) {
    return class PopUp extends Component {

        state = {isOpen: false}

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

        setPopUpRef = node => this.popUpRef = node

        setToggleBtnRef = node => this.btnRef = node

        handleClickOutside = e => {
            if(
                this.popUpRef &&
                !this.popUpRef.contains(e.target) &&
                e.target !== this.btnRef
            )
                this.setState({isOpen: false})
        }

        togglePopUp = () =>
            this.setState({
                isOpen: !this.state.isOpen
            })

        closePopUp = () =>
            this.setState({
                isOpen: false
            })

        openPopUp = () =>
            this.setState({
                isOpen: true
            })

        render() {
            return (
                <RawComponent
                    {...this.props}
                    setPopUpRef={this.setPopUpRef}
                    setToggleBtnRef={this.setToggleBtnRef}
                    togglePopUp={this.togglePopUp}
                    closePopUp={this.closePopUp}
                    openPopUp={this.openPopUp}
                    isOpen={this.state.isOpen}
                />
            )
        }
    }
}

export default popUp
