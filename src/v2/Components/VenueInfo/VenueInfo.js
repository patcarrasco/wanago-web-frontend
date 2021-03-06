import React from 'react'
import {connect} from 'react-redux'
import { Button, Grid, Loader, Dimmer } from 'semantic-ui-react';
import VenueInfoEventCard from './VenueInfoEventCard';


class VenueInfo extends React.PureComponent {

    events = () => {
        return this.props.events.map(event => <VenueInfoEventCard key={event.id} {...event} />)
    }

    content = () => (
        <Grid>
            {this.events()}
        </Grid>
    )

    render() {
        return (  
                <>
                    <div className="venue-info-from-map" style={{display:'flex', flexDirection:'row', marginBottom: '10px'}}>
                        <div>
                            <Button circular icon='angle left' onClick={this.props.closeVenueInfoHandler} />
                        </div>
                        <div style={{flex: 'auto', textAlign: 'center'}}>
                            <h3 style={{fontWeight: 'bold'}}>Upcoming at {this.props.venue.name}</h3>
                        </div>
                    </div>
                    <div style={{width:'inherit', minHeight:'160px'}}>
                        {!!this.props.events ? this.content() : <Dimmer active><Loader size='small'/></Dimmer>}
                    </div>
                </>
        )
    }
}

const mapStateToProps = (state) => ({
    events: state.venue.venueEvents,
    venue: state.venue.selectedVenue
})

export default connect(mapStateToProps)(VenueInfo)