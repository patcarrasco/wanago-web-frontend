import React, { PureComponent } from 'react'
import {connect} from 'react-redux'
import { Header } from 'semantic-ui-react'


class EventsBar extends PureComponent {

    render() {
        return(
            <Header> Eventsbar!!</Header>
        )
    }
}

// export default connect()(EventsBar)
export default EventsBar