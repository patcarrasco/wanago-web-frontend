import React, { PureComponent } from 'react'
import { Card, Segment, Container, Grid} from 'semantic-ui-react'
import EventCard from '../EventCard/EventCard';
import SpotlightEventCard from '../EventCard/SpotlightEventCard';
import styles from '../../assets/stylesheets/spotlight.css'
import {connect} from 'react-redux'

class SpotlightEventContainer extends PureComponent {

    
    spotlight = () => {
        let events = this.props.spotlightEvents || false
        if (events !== false) {
            debugger
            let eventsArr = events._embedded.events.slice(0,6)
            return eventsArr.map(e => <SpotlightEventCard key={e.id} event={e} /> )
        } else {
            return null
        }
    }
    
    render(){
        return(
            <section className={styles.spotlightGrid}>
                {this.spotlight()}
            </section>
        )
    }
}


const mapStateToProps = (state) => ({
    spotlightEvents: state.events.spotlightEvents
})

export default connect(mapStateToProps)(SpotlightEventContainer)


