import React, { PureComponent } from 'react'
import {Form, Icon, Modal, Button, Divider, Item, Grid} from 'semantic-ui-react'
import firebase from '../../Firebase'

import {connect} from 'react-redux'
import {showLogin} from '../../store/actions/navbarActions'
import {withRouter} from 'react-router-dom'

const API_LOGIN = 'http://localhost:3000/api/v1/login'

class SignInForm extends PureComponent {
    state = {username:'', password:''}

    handleInputChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = () => {
        let token;
        this.fetchSignIn()
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setToken(data.auth_token)
                this.setApiToken(data.api_token)
            })
            .then(() => {
                firebase
                    .auth()
                    .signInWithCustomToken(token)
                    .then(() => {
                        this.props.history.push('/home')
                        this.props.showLogin(false)
                    })
            })
            .catch((err) => console.log('There was an ERROR: ', err))
    }

    setToken = (token) => {
        console.log(token)
        localStorage.setItem('token', token)
    }

    setApiToken = (token) => {
        localStorage.setItem('api_token', token)
    }

    fetchSignIn = () => {
        const {username, password} = this.state
        const creds = {
            username: username,
            password: password,
        }

        return fetch(API_LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(creds)
        })
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
        return(
            <Modal open={true} size='tiny' dimmer={'blurring'}>
                <Modal.Content>
                        <Item.Group>
                            <Item>
                                <Button circular icon='x' onClick={this.handleExit}/>
                            </Item>
                            <Item>
                                <Button size='large' fluid color='facebook'>
                                    <Icon name='facebook'/> Log in with facebook
                                </Button>
                            </Item>
                            <Item>
                                <Button size='large' fluid>
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
    showLogin: (bool) => dispatch(showLogin(bool))
}) 


export default withRouter(connect(null, mapDispatchToProps)(SignInForm))