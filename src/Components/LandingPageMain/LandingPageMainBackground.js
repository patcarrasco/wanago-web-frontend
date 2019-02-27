import React from 'react'
import {Grid} from 'semantic-ui-react'
import NavBar from '../Navbar/Navbar';
import LandingEventSearch from '../LandingEventSearch/LandingEventSearch';
import styles from '../../assets/stylesheets/landingpage.css'

const LandingPageMainBackground = () => (
    <div className={styles.headerContainer}>
        <div className={styles.headerImg}>
            <NavBar />
            <Grid centered columns={2} className={styles.headerGrid}>
                <Grid.Row verticalAlign="middle">
                    <Grid.Column>
                        <LandingEventSearch />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    </div>
)

export default LandingPageMainBackground