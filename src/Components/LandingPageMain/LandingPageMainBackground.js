import React from 'react'
import {Grid} from 'semantic-ui-react'
import NavBar from '../Navbar/Navbar';
import LandingEventSearch from '../LandingEventSearch/LandingEventSearch';
import styles from '../../assets/stylesheets/landingpage.css'

const LandingPageMainBackground = () => (
    <div className={styles.headerContainer}>
        <div className={styles.headerImg}>
            <NavBar />
          
        </div>
    </div>
)

export default LandingPageMainBackground