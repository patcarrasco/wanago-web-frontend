import React, { PureComponent } from 'react'
import { Card, Image, Header } from 'semantic-ui-react'
import styles from '../../assets/stylesheets/spotlight.css'

class SpotlightEventCard extends PureComponent {
    state = {flipped: true}

    clickHandler = () => this.setState({flipped: !this.state.flipped})

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
                    
                    {this.state.flipped
                    ?
                    <Card onClick={this.clickHandler}>
                        <Image 
                            src={image} 
                            className={styles.spotlightImg}
                        />
                    </Card>
                    :
                    <Card onClick={this.clickHandler}>
                        <Card.Content>
                            <Header color='black'>{name}</Header>
                        </Card.Content>
                    </Card>
                    }
                </div>
        )
    }
}

export default SpotlightEventCard