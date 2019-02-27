import React, { PureComponent } from 'react'
import {Form} from 'semantic-ui-react'
import styles from '../../assets/stylesheets/landingpage.css'

class LandingEventSearch extends PureComponent {
    state = {focused: false}

    focusHandler = () => {
        this.setState({focused: true})
    }

    render() {
        return(

            // <div className={styles.landingPageElements}>
                    <Form className={styles.landingPageForm}>
                        <Form.Field>
                            <Form.Input size='massive' placeholder = "search by artist, venue, event..." icon='search' onClick={this.focusHandler} />
                        </Form.Field>                 
                    </Form>
            // </div>
        )
    }
}


export default LandingEventSearch