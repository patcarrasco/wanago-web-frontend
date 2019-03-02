import React, { PureComponent } from 'react'
import { Card, Image, Grid, Segment, Header, Button } from 'semantic-ui-react'
import styles from '../../assets/stylesheets/spotlight.css'

class SpotlightEventCard extends PureComponent {

    render() {
        const {name, _embedded, dates, images} = this.props.event
        const {attractions, venues} = _embedded
        const filtered = images.filter(e => e.ratio === "16_9")
        const image = filtered.shift().url
        const artists = attractions.map(e => e.name)
        const city = venues.map(e => e.name)
        const date = dates.start.localDate
        const time = dates.start.localTime
        // console.log(images)
        return (

                <div className={styles.cardContent}>
                    <img src={image} alt='spotlightImage' className={styles.spotlightImg}/>
                </div>


                // {/* <Card.Content>
                //     <Card.Header>
                //         {name}
                //     </Card.Header>
                //     <Card.Meta>
                //         {artists}
                //     </Card.Meta>
                // </Card.Content>
                // <Card.Content extra>
                //     {city}
                //     {date}
                //     {time}
                // </Card.Content> */}
            
            // <Grid.Row>
            //     <Grid.Column floated='right'>
            //         <img src={image} alt='spotlightImage' className={styles.spotlightImg}/>
            //     </Grid.Column>
            //     <Grid.Column floated='left'>
            //         <Card fluid >
            //             <Card.Content>
            //                 <Card.Header>
            //                     {name}
            //                 </Card.Header>
            //                 <Card.Meta>
            //                     {artists}
            //                 </Card.Meta>
            //             </Card.Content>
            //             <Card.Content extra>
            //                 {city}, {date}, {time}
            //             </Card.Content>
            //         </Card>
            //         <Button>Add to Favorites</Button>
            //         <Button> Send to Friends </Button>
            //     </Grid.Column>
            // </Grid.Row>
        )
    }
}

export default SpotlightEventCard