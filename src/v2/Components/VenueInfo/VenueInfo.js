import React from 'react'
import {connect} from 'react-redux'
import { Button, Header, Grid, Loader, Segment } from 'semantic-ui-react';
import VenueInfoEventCard from './VenueInfoEventCard';


function VenueInfo(props) {

    function events() {
        return props.events.map(event => <VenueInfoEventCard key={event.id} {...event} />)
    }

    const content = () => (
        <Grid>
            {events()}
        </Grid>
    )

    return (  
            <>
                <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                    <div>
                        <Button circular icon="arrow left" onClick={props.closeVenueInfoHandler} />
                    </div>
                    <div style={{flex: 'auto'}}>
                        <h3 style={{fontWeight: 'bold'}}>Upcoming at {props.venue.name}</h3>
                    </div>
                </div>
                <div>
                    {!!props.events ? content() : <Loader active>Loading...</Loader>}
                </div>
            </>
    )
}

const mapStateToProps = (state) => ({
    events: state.venue.venueEvents,
    venue: state.venue.selectedVenue
})

export default connect(mapStateToProps)(VenueInfo)