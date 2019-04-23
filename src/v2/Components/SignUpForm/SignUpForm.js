import React, { PureComponent } from 'react'
import {Form, Icon, Modal, Button, Divider, Item, Container, Message} from 'semantic-ui-react'
import firebase from '../../../Firebase'
import {withRouter} from 'react-router-dom'

import {connect} from 'react-redux'
import { showSignup } from '../../../store/actions/navbarActions';
import { _signUp } from '../../../store/thunks/auth';
import {loadPositional} from '../../../store/thunks/users'


class SignUpForm extends PureComponent {
    state = {
        username:'', 
        password:'', 
        showForm: false, 
        error: false, 
        errorMessage: "", 
        active:false, 
        signUpClicked: false, 
        complete: false, 
        herokuError: false, 
        herokuErrorMessage: ""
    }

    handleInputChange = (e) => {
        this.setState({[e.target.name]: e.target.value, error: false})
    }

    toggleSignUpForm = () => {
        this.setState({showForm: true})
    }

    handleExit = () => {
        this.props.showSignup(false)
    }

    handleMouse = () => {
        this.setState({
            active: !this.state.active
        })
    }

    createUser = () => {
        if (this.state.password.length < 4) {
            this.setState({error: true, errorMessage: ["Password must be atleast 4 characters"]})
        } else {
            this.setState({signUpClicked: true})
            this.props.createUser(this.state).then((e) => {
                if (e.status) {
                    firebase
                        .auth()
                        .signInWithCustomToken(localStorage.getItem('token'))
                        .then(() => {
                            this.props._loadPosition()
                            this.props.showSignup(false)
                            this.props.history.push('/home')
                        })
                } else {
                    this.setState({signInClicked:false, error: true, errorMessage:e.message})
                }
                })
                .catch((err) => {
                    this.setState({signUpClicked: false})
                    console.error('There was an ERROR: ', err)
                })
            
            setTimeout(() => {
                if (!this.state.complete && this.state.signUpClicked) {
                    this.setState({herokuError:true, herokuErrorMessage:"This app may have been asleep :(. Please wait while the heroku backend boots up."})
                    setTimeout(()=>this.setState({herokuError:false}), 10000)
                }
            }, 10000)
        }
    }


    signUpNav = () => (
        <>
            <Item.Group>
                <Item>
                    <Button size='large' fluid color='facebook' disabled style={{borderRadius:'unset'}}>
                        <Icon name='facebook'/> Continue with facebook
                    </Button>
                </Item>
                <Item>
                    <Button size='large' fluid disabled style={{borderRadius:'unset'}}>
                        <Icon name='google' /> Continue with google
                    </Button>
                </Item>
            </Item.Group>
            
            
            <Divider horizontal> Or </Divider>

            <Button size='large' fluid color='purple' onClick={this.toggleSignUpForm} style={{borderRadius:'unset', backgroundColor:'#3d52d5'}}>
                Create an Account
            </Button>
        </>
    )

    signUpForm = () => (
        <>
            <Form>
                <Form.Field>
                    <Form.Input 
                        size='large' 
                        placeholder='Create a username' 
                        icon='user circle outline' 
                        name='username' 
                        value={this.state.username} 
                        onChange={this.handleInputChange}
                    />
                </Form.Field>
                <Form.Field>
                    <Form.Input 
                        type='password' 
                        size='large' 
                        placeholder='Password' 
                        icon='lock' 
                        name='password' 
                        value={this.state.password} 
                        onChange={this.handleInputChange}
                    />
                </Form.Field>
                {
                    this.state.error 
                    ?
                    <Message
                        negative
                        header="Error:"
                        list={this.state.errorMessage}
                    />              
                    :
                    <Button loading={this.state.signUpClicked} fluid size='large' color='purple' onClick={this.createUser} style={{borderRadius: 'unset', backgroundColor:'#3d52d5'}}>
                        Sign up
                    </Button>
                }
            </Form>
            {this.state.herokuError && <Message>{this.state.herokuErrorMessage}</Message>}
            <Divider/>
            <Container textAlign='center'>
                Already Have an Account?
                 <button 
                    name='login' 
                    onClick={()=>this.props.showSignup(false)}
                    onMouseEnter={this.handleMouse}
                    onMouseLeave={this.handleMouse}
                    style={{
                        borderWidth: 0,
                        borderColor: "transparent",
                        backgroundColor: "transparent",
                        color: `${this.state.active ? '#3d52d5' : '#3c3744'}`,
                        fontWeight: `${this.state.active ? 'bold' : ''}`
                    }}
                >
                    Log in
                </button>
            </Container>
        </>
    )

    escFunction = (e) => {
        if (e.keyCode === 27) {
            this.props.showSignup(false)
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.escFunction, false) // last argument is useCapture, which tells if event should be executed in capture or bubble. false is bubble
    }

    componentWillMount() {
        document.removeEventListener('keydown', this.escFunction, false)
    }

    render() {
        return(
            <Modal open={true} size='tiny' dimmer={'blurring'} >
                <Modal.Content style={{borderRadius: 'unset'}}>
                    <Item.Group>
                        <Button circular icon='x' onClick={this.handleExit}/>
                    </Item.Group>

                    {this.state.showForm ? this.signUpForm() : this.signUpNav()}
                    
                </Modal.Content>
            </Modal>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    showSignup: (bool) => dispatch(showSignup(bool)),
    createUser: (creds) => dispatch(_signUp(creds)),
    _loadPosition: () => dispatch(loadPositional())
})

export default withRouter(connect(null, mapDispatchToProps)(SignUpForm))