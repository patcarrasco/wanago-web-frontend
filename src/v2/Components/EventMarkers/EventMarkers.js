import React, { PureComponent } from 'react'
import {Marker} from 'google-maps-react'

function EventMarkers(props) {

    return (
            <Marker 
            key={'marker-user'}
            title={'my location'}
            position={
                {
                    lat: props.lat,
                    lng: props.lon,
                }
            }
        />
    )
}

export default EventMarkers