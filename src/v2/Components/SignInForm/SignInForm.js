import React, { PureComponent } from 'react'
import {Form, Input, Message} from 'semantic-ui-react'
import firebase from '../../../Firebase'
import {withRouter} from 'react-router-dom'

import {connect} from 'react-redux'
import {showLogin, showSignup} from '../../../store/actions/navbarActions'
import {_signIn} from '../../../store/thunks/auth'
import {loadPositional} from '../../../store/thunks/users'



class SignInForm extends PureComponent {
    state = {username:'', password:'', active: false, error: false, errorMessage: ""}

    handleInputChange = (e) => {
        this.setState({[e.target.name]: e.target.value, error: false})
    }

    handleSignUpClick = (e) => {
        this.props.showSignup(true)
    }

    handleSubmit = () => {
        this.props.signIn(this.state).then((status) => {
            if (status) {
                firebase
                    .auth()
                    .signInWithCustomToken(localStorage.getItem('token'))
                    .then(() => {
                        this.props._loadPositional()
                        this.props.showLogin(false)
                        this.props.history.push('/home')
                    })
            } else {
                this.setState({errorMessage: "username / password does not match our records", error: true})
            }
        }).catch((err) => console.log('There was an ERROR: ', err))
    }

    handleMouse = () => {
        this.setState({
            active: !this.state.active
        })
    }

    render() {
        return(
                <>
                    <Form className="big">
                        <Form.Field>
                            <Input icon="user" placeholder = "username" name='username' value={this.state.username} onChange={this.handleInputChange}
                                style={{borderRadius:'unset'}}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Input 
                                type='password' icon="key" placeholder = "password" name='password' value={this.state.password} onChange={this.handleInputChange} 
                                style={{
                                    borderRadius:'unset',
                                    // backgroundColor:"transparent"
                                }}
                            />
                        </Form.Field>
                        <Form.Field>
                            {
                                this.state.error
                            ?
                                <Message negative>
                                    {this.state.errorMessage}
                                </Message>
                            :
                                <button
                                    name='logIn'  
                                    onClick={this.handleSubmit}
                                    style={{
                                        // borderRadius:"3px",
                                        borderColor: "#b4c5e4",
                                        backgroundColor: "#b4c5e4",
                                        color: "#3c3744",
                                        width: "100%",
                                        height: "40px",
                                        fontFamily:"Roboto, sans-serif"
                                    }} 
                                > 
                                    LOG IN
                                </button>
                            }
                        </Form.Field>
                        <Form.Field style={{color: '#fbfff1', fontFamily: "Roboto, sans-serif", textAlign:'center'}}>
                            No account?
                            <button 
                                name='signUp' 
                                onClick={this.handleSignUpClick}
                                onMouseEnter={this.handleMouse}
                                onMouseLeave={this.handleMouse}
                                style={{
                                //     borderRadius:"3px",
                                    borderWidth: 0,
                                    borderColor: "transparent",
                                    backgroundColor: "transparent",
                                    color: `${this.state.active ? '#fbfff1' : '#b4c5e4'}`,
                                    fontWeight: `${this.state.active ? '1000' : '400'}`
                                //     width: "100%",
                                //     height: "50px"
                                }}
                            >
                                Sign up
                            </button>
                        </Form.Field>
                    </Form>

                                
                </>
        )
    }
}

// const mapStateToProps = () => ()
const mapDispatchToProps = (dispatch) => ({
    signIn: (creds) => dispatch(_signIn(creds)),
    showLogin: (bool) => dispatch(showLogin(bool)),
    showSignup: (bool) => dispatch(showSignup(bool)),
    _loadPositional: () => dispatch(loadPositional()),
}) 

export default withRouter(connect(null, mapDispatchToProps)(SignInForm))