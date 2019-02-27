import React, { PureComponent } from 'react'
import {connect} from 'react-redux'

import LandingPageContent from '../Components/LandingPageContent/LandingPageContent';
import LandingPageMainBackground from '../Components/LandingPageMain/LandingPageMainBackground';

import SignInForm from '../Components/SignInForm/SignInForm'
import SignUpForm from '../Components/SignUpForm/SignUpForm'


class LandingPage extends PureComponent {
    state = { 
        partnerInfo: false, 
        loadSuccess: false, 
    }

    becomeAPartnerHandler = () => {
        this.setState({partnerInfo: !this.state.partnerInfo})
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
                {/* Auth Modals */}
                {this.props.showSignUp && <SignUpForm />}
                {this.props.showLogin && <SignInForm />}

                {/* Top Header content */}
                
                <LandingPageMainBackground />

                {/* Page Content */}
                {this.state.loadSuccess ? <LandingPageContent /> : null}
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    showSignUp: state.landingNavbar.showSignup,
    showLogin: state.landingNavbar.showLogin
})

export default connect(mapStateToProps)(LandingPage)