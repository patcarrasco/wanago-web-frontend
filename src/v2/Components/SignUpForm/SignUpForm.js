import React, { PureComponent } from 'react'
import {Form, Icon, Modal, Button, Divider, Item, Container, Message} from 'semantic-ui-react'
import firebase from '../../../Firebase'
import {withRouter} from 'react-router-dom'

import {connect} from 'react-redux'
import { showSignup } from '../../../store/actions/navbarActions';
import { _signUp } from '../../../store/thunks/auth';
import {loadPositional} from '../../../store/thunks/users'


class SignUpForm extends PureComponent {
    state = {username:'', password:'', showForm: false, error: false, errorMessage: ""}

    handleInputChange = (e) => {
        this.setState({[e.target.name]: e.target.value, error: false})
    }

    toggleSignUpForm = () => {
        this.setState({showForm: true})
    }

    handleExit = () => {
        this.props.showSignup(false)
    }

    createUser = () => {
        if (this.state.password.length < 4) {
            this.setState({error: true, errorMessage: ["Password must be atleast 4 characters"]})
        } else {
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
                    console.log(e.message)
                    this.setState({error: true, errorMessage:e.message})
                }
                })
                .catch((err) => console.log('There was an ERROR: ', err))
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
            <Container textAlign='center'>
                Sign up with Facebook or Google
            </Container>
            <Divider horizontal> or </Divider>

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
                    <Button fluid size='large' color='purple' onClick={this.createUser} style={{borderRadius: 'unset', backgroundColor:'#3d52d5'}}>
                        Sign up
                    </Button>
                }
            </Form>
            <Divider/>
            <Container textAlign='center'>
                Already Have an Account? Log in
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