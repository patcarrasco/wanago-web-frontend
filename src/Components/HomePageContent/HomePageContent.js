import React from 'react'
import {Header, Segment, Button, Input, Form, Icon} from 'semantic-ui-react'
import {connect} from 'react-redux'

// thunks
import {getSpotlightEvents, getEventsByLocation} from '../../store/thunks/event'
import SpotlightEventContainer from '../EventContainer/SpotlightEventContainer';
import EventsByLocationContainer from '../EventContainer/EventsByLocationContainer';
import LandingEventSearch from '../LandingEventSearch/LandingEventSearch';

class HomePageContent extends React.PureComponent {
    state = {userLocation: 'New York'}

    componentDidMount() {
        this.props.getSpotlightEvents()
    }

    onChangeHandler = e => this.setState({userLocation: e.target.value})

    eventSearchHandler = () => {this.props.getEventsByLocation(this.state.userLocation)}

    searchByUserLocation = () => (
        <Segment >
            <Form inverted>
                <Form.Field >
                    <Form.Input 
                        size='massive' 
                        placeholder = {`Find events near ${this.state.userLocation}`} 
                        icon={
                            <Icon 
                                name='search'
                                inverted
                                circular
                                link
                                color='violet'
                                onClick={this.eventSearchHandler}
                            />
                        }
                        onChange={this.onChangeHandler} 
                        />
                </Form.Field>                 
            </Form>
        </Segment>


    )

    render() {
        return (
            <>
                <SpotlightEventContainer />
                {this.searchByUserLocation()}
                    <EventsByLocationContainer />
                <Segment inverted>
                    <Header> footer </Header>
                </Segment>
            </>
        )
    }
}



const mapDispatchToProps = (dispatch) => ({
    getSpotlightEvents: () => dispatch(getSpotlightEvents()),
    getEventsByLocation: (query) => dispatch(getEventsByLocation(query))
})

export default connect(null, mapDispatchToProps)(HomePageContent)