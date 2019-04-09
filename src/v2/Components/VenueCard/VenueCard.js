import React from 'react'
import { Grid } from 'semantic-ui-react';

function VenueCard(props) {
    console.log(props)

    // currently, adding props to this and formatting the venue card, HOW should i show venues on the app?

    return (
        <Grid.Row columns={2} style={{borderBottom:"1px solid #b4c5e4", minHeight:"6em"}}>
            <Grid.Column style={{fontSize:"16px", color:"#3c3744"}}>
           
            </Grid.Column>
            <Grid.Column style={{fontSize:"16px", color:"#3c3744", alignItems:'center'}}>
            more info
            </Grid.Column>
        </Grid.Row>
    )
}


export default VenueCard