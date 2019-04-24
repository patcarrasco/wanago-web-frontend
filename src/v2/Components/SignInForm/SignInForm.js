import React, { PureComponent } from 'react'
import {Form, Input, Message, Button} from 'semantic-ui-react'
import firebase from '../../../Firebase'
import {withRouter} from 'react-router-dom'

import {connect} from 'react-redux'
import {showLogin, showSignup} from '../../../store/actions/navbarActions'
import {_signIn} from '../../../store/thunks/auth'
import {loadPositional} from '../../../store/thunks/users'



class SignInForm extends PureComponent {
    state = {
        username:'', 
        password:'', 
        active: false, 
        error: false, 
        errorMessage: "", 
        signInClicked: false, 
        herokuError: false, 
        complete: false, 
        herokuErrorMessage: ""
    }

    handleInputChange = (e) => {
        this.setState({[e.target.name]: e.target.value, error: false})
    }

    handleSignUpClick = (e) => {
        this.props.showSignup(true)
    }

    handleSubmit = () => {
        this.setState({signInClicked: true})
        this.props.signIn(this.state).then((status) => {
            if (status) {
                firebase
                    .auth()
                    .signInWithCustomToken(localStorage.getItem('token'))
                    .then(() => {
                        this.setState({complete: true})
                        this.props._loadPositional()
                        this.props.showLogin(false)
                        this.props.history.push('/home')
                    })
            } else {
                
                this.setState({signInClicked:false ,errorMessage: "username / password does not match our records", error: true})
            }
        }).catch((err) => {
            this.setState({signInClicked: false})
            console.error('There was an ERROR: ', err)
        })

        setTimeout(() => {
            if (!this.state.complete && this.state.signInClicked) {
                this.setState({herokuError:true, herokuErrorMessage:"App may be asleep :(. Please wait while heroku backend boots up."})
                setTimeout(()=>this.setState({herokuError:false}), 10000)
            }
        }, 10000)
    }

    handleMouse = () => {
        this.setState({
            active: !this.state.active
        })
    }

    render() {
        return(
                <>
                    {this.state.herokuError && <Message>{this.state.herokuErrorMessage}</Message>}
                    <Form className="big">
                        <Form.Field>
                            <Input icon="user" placeholder = "username" name='username' value={this.state.username} onChange={this.handleInputChange}
                                style={{borderRadius:'unset'}}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Input 
                                type='password' icon="key" placeholder = "password" name='password' value={this.state.password} onChange={this.handleInputChange} 
                                style={{}}
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
                                <Button
                                    name='logIn'  
                                    onClick={this.handleSubmit}
                                    loading={this.state.signInClicked}
                                    style={{
                                        borderRadius:"0px",
                                        backgroundColor: "#3d52d5",
                                        color: "#fbfff1",
                                        width: "100%",
                                        height: "40px",
                                        fontFamily:"Roboto, sans-serif"
                                    }} 
                                > 
                                    LOG IN
                                </Button>
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
                                    fontWeight: `${this.state.active ? 'bold' : ''}`
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