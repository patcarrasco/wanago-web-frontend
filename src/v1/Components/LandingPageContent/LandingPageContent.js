import React from 'react'
import {Header, Segment} from 'semantic-ui-react'
import styles from '../../assets/stylesheets/landingpage.css'

const LandingPageContent = () => (
    <>
        <div className={styles.landingPageContent}>
            <Header as='h1'> Spotlight </Header>
            <Segment>
                <Header> Spotlight events go here</Header>
            </Segment>
            <Header as='h1'>Top Selling</Header>
            <Segment>
                <Header>Top Seller Content Goes Here</Header>
            </Segment>
            <Header as='h1'> Just announced </Header>
            <Segment>
                <Header> Recently created Events go here</Header>
            </Segment>
        </div>
        <Segment inverted>
            <Header> footer </Header>
        </Segment>
    </>
)

export default LandingPageContent