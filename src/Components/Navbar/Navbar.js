import React from 'react'
import {Menu, Header} from 'semantic-ui-react'
import styles from '../../../src/assets/stylesheets/landingpage.css'

import {connect} from 'react-redux'
import {showLogin, showSignup} from '../../store/actions/navbarActions'


class NavBar extends React.PureComponent {
    state = {activeItem: 'home'}

    handleItemClick = (e, {name}) => {
        this.setState({activeItem: name})
        name === 'becomeAPartner' && console.log('becoming a partner....')
        name === 'signUp' && this.props.showSignup(true)
        name === 'logIn' && this.props.showLogin(true)
    }

    render() {
        const {activeItem} = this.state

        return (
            <>
                < Menu size='huge' inverted secondary className={styles.landingNav}>
                    < Menu.Item >
                        Evio
                    </ Menu.Item >
                    < Menu.Menu position="right" >
                        < Menu.Item name='becomeAPartner' active={'becomeAPartner' === activeItem} className="pointing" onClick={this.handleItemClick} > Become a partner </ Menu.Item >
                        < Menu.Item name='signUp' active={'signUp' === activeItem} onClick={this.handleItemClick} > Sign up </ Menu.Item>
                        < Menu.Item name='logIn' active={'logIn' === activeItem} onClick={this.handleItemClick} > Log in </ Menu.Item>
                    </ Menu.Menu >
                </Menu>
            </>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
  showLogin: (bool) => dispatch(showLogin(bool)),
  showSignup: (bool) => dispatch(showSignup(bool))
})

export default connect(null, mapDispatchToProps)(NavBar)