import React, { PureComponent } from 'react'
import {Form, Icon, Modal, Button, Divider, Item, Container} from 'semantic-ui-react'

import {connect} from 'react-redux'
import { showSignup } from '../../store/actions/navbarActions';

class SignUpForm extends PureComponent {
    state = {username:'', password:'', showForm: false}

    handleInputChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    toggleSignUpForm = () => {
        this.setState({showForm: true})
    }

    handleExit = () => {
        this.props.showSignup(false)
    }


    signUpNav = () => (
        <>
            <Item.Group>
                <Item>
                    <Button size='large' fluid color='facebook'>
                        <Icon name='facebook'/> Continue with facebook
                    </Button>
                </Item>
                <Item>
                    <Button size='large' fluid>
                        <Icon name='google' /> Continue with google
                    </Button>
                </Item>
            </Item.Group>
            
            
            <Divider horizontal> Or </Divider>

            <Button size='large' fluid color='purple' onClick={this.toggleSignUpForm}>
                Create an Account
            </Button>
        </>
    )

    signUpForm = () => (
        <>
            <Container textAlign='center'>
                Sign up with <a href='www.facebook.com'>Facebook</a> or <a href='www.google.com'>Google</a>
            </Container>
            <Divider horizontal> or </Divider>

            <Form>
                <Form.Field>
                    <Form.Input size='large' placeholder='Create a username' icon='user circle outline' />
                </Form.Field>
                <Form.Field>
                    <Form.Input type='password' size='large' placeholder='Password' icon='lock' />
                </Form.Field>
                <Button fluid size='large' color='purple'>
                    Sign up
                </Button>
            </Form>
            <Divider/>
            <Container textAlign='center'>
                Already Have an Account? <a href='www.signin.com'>Log in</a>
            </Container>
        </>
    )

    escFunction = (e) => {
        if (e.keyCode === 27) {
            this.handleExit()
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
                <Modal.Content>
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
    showSignup: (bool) => dispatch(showSignup(bool))
})

export default connect(null, mapDispatchToProps)(SignUpForm)