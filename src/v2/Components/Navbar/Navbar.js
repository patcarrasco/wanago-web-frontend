import React from 'react'
import {Menu} from 'semantic-ui-react'

import {connect} from 'react-redux'
import {showLogin, showSignup} from '../../../store/actions/navbarActions'


class NavBar extends React.PureComponent {
    state = {activeItem: 'home'}

    handleItemClick = (e, {name}) => {
        this.setState({activeItem: name})
        name === 'signUp' && this.props.showSignup(true)
        name === 'logIn' && this.props.showLogin(true)
    }

    render() {
        const {activeItem} = this.state

        return (
            < Menu inverted pointing secondary>
                < Menu.Item>
                    Evio
                </ Menu.Item >
                < Menu.Menu position="right" >
                    < Menu.Item name='signUp' active={'signUp' === activeItem} onClick={this.handleItemClick} > Sign up </ Menu.Item>
                    < Menu.Item name='logIn' active={'logIn' === activeItem} onClick={this.handleItemClick} > Log in </ Menu.Item>
                </ Menu.Menu >
            </Menu>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
  showLogin: (bool) => dispatch(showLogin(bool)),
  showSignup: (bool) => dispatch(showSignup(bool))
})

export default connect(null, mapDispatchToProps)(NavBar)