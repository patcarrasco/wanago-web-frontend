import React, { PureComponent } from 'react'
import SpotlightEventCard from '../EventCard/SpotlightEventCard';
import styles from '../../assets/stylesheets/spotlight.css'
import {connect} from 'react-redux'
import { Header } from 'semantic-ui-react';

class SpotlightEventContainer extends PureComponent {

    
    spotlight = () => {
        let events = this.props.spotlightEvents || false
        if (events !== false) {
            let eventsArr = [...events._embedded.events]
            return eventsArr.map(e => <SpotlightEventCard key={e.id} event={e} /> )
        } else {
            return null
        }
    }
    
    render(){
        return(
            <>
                <section className={styles.sponsoredText}>
                    <Header as='h5' color='grey'>
                        sponsered
                    </Header>
                </section>
                <section className={styles.spotlightGrid}>
                    {this.spotlight()}
                </section>
            </>
        )
    }
}


const mapStateToProps = (state) => ({
    spotlightEvents: state.events.spotlightEvents
})

export default connect(mapStateToProps)(SpotlightEventContainer)


