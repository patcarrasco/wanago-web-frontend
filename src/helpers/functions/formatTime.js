import React from 'react'
import Moment from 'react-moment'
import 'moment-timezone'

export default function formatTime(time) {
    return <Moment tx="America/New_York" format="h:mm a"> {time} </Moment>
}