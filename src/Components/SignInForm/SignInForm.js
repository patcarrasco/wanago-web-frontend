import React, { PureComponent } from 'react'
import {Form, Icon, Modal, Button, Divider, Item, Grid} from 'semantic-ui-react'
import firebase from '../../Firebase'
import {withRouter} from 'react-router-dom'

import {connect} from 'react-redux'
import {showLogin} from '../../store/actions/navbarActions'
import {_signIn} from '../../store/thunks/auth'
import {loadPositional} from '../../store/thunks/users'


class SignInForm extends PureComponent {
    state = {username:'', password:''}

    handleInputChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = () => {
        this.props.signIn(this.state).then(() => {
            firebase
                .auth()
                .signInWithCustomToken(localStorage.getItem('token'))
                .then(() => {
                    this.props._loadPositional()
                    this.props.showLogin(false)
                    this.props.history.push('/map')
                })
        })
        .catch((err) => console.log('There was an ERROR: ', err))
    }

    handleExit = () => {  
        this.props.showLogin(false)
    }

    escFunction = (e) => {
        if(e.keyCode === 27) {
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
        console.log(this.state.username, this.state.password)
        return(
            <Modal open={true} size='tiny' dimmer={'blurring'}>
                <Modal.Content>
                        <Item.Group>
                            <Item>
                                <Button circular icon='x' onClick={this.handleExit}/>
                            </Item>
                            <Item>
                                <Button size='large' fluid color='facebook' disabled>
                                    <Icon name='facebook'/> Log in with facebook
                                </Button>
                            </Item>
                            <Item>
                                <Button size='large' fluid disabled>
                                    <Icon name='google' /> Log in with google
                                </Button>
                            </Item>
                        </Item.Group>
                   
                   
                    <Divider horizontal> Or </Divider>
                    
                    <Form>
                        <Form.Field>
                            <Form.Input size='large' placeholder = "username" name='username' value={this.state.username} onChange={this.handleInputChange}/>
                        </Form.Field>
                        <Form.Field>
                            <Form.Input size='large' type='password' placeholder = "password" name='password' value={this.state.password} onChange={this.handleInputChange} />
                        </Form.Field>
                        <Button size='large' fluid color='purple' onClick={this.handleSubmit}>Log in</Button>
                        <Form.Field>
                        </Form.Field>
                    </Form>
                    <Divider />
                       <Grid columns='equal' textAlign='center' divided>
                            <Grid.Row>
                                <Grid.Column>
                                    Forgot Password?
                                </Grid.Column>
                                <Grid.Column>
                                    No account? Sign up
                                </Grid.Column>
                            </Grid.Row>
                       </Grid>
                </Modal.Content>
            </Modal>
        )
    }
}

// const mapStateToProps = () => ()
const mapDispatchToProps = (dispatch) => ({
    signIn: (creds) => dispatch(_signIn(creds)),
    showLogin: (bool) => dispatch(showLogin(bool)),
    _loadPositional: () => dispatch(loadPositional())
}) 

export default withRouter(connect(null, mapDispatchToProps)(SignInForm))