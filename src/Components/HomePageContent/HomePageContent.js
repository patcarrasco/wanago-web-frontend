import React from 'react'
import {Header, Segment} from 'semantic-ui-react'
import EventContainer from '../EventContainer/EventContainer';
import {connect} from 'react-redux'

const HomePageContent = () => (
    <>
        <Header as='h1'> Spotlight </Header>
        <Segment>
            <EventContainer />
        </Segment>

        <Segment inverted >
            <Header as='h1'> Happening in (City Name Here) </Header>
            <Segment>
                <EventContainer/>
            </Segment>


            <Header as='h1'>Top Selling</Header>
            <Segment>
                <EventContainer />
            </Segment>

            <Header as='h1'> Just announced </Header>
            <Segment>
                <EventContainer />
            </Segment>

            <Header as='h1'> Rock Concerts </Header>
            <Segment>
                <EventContainer />
            </Segment>

            <Header as='h1'> Hip Hop </Header>
            <Segment>
                <EventContainer />
            </Segment>
        </Segment>
        <Segment inverted>
            <Header> footer </Header>
        </Segment>
    </>
)

const mapStateToProps = (state) => ({
    spotlightEvents: state.spotlightEvents
})

const mapDispatchToProps = (dispatch) => ({})

export default HomePageContent