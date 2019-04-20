import React, { PureComponent } from 'react'
import {connect} from 'react-redux'
import LandingPageMainBackground from '../Components/LandingPageMainBackground/LandingPageMainBackground';

import SignUpForm from '../Components/SignUpForm/SignUpForm'


class LandingPage extends PureComponent {
    state = { 
        loadSuccess: false, 
    }

    componentDidMount(){
        setTimeout(
            () => this.setState({ loadSuccess: true }),
            200
        )
    }

    render(){
        return(
            <>  
                {this.props.showSignUp && <SignUpForm />}                
                <LandingPageMainBackground />
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    showSignUp: state.navbar.showSignup,
})

export default connect(mapStateToProps)(LandingPage)