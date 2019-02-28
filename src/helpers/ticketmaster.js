import React from 'react'
import ticketmaster from 'ticketmaster'


const key = localStorage.getItem('api_key')

export const getEvents = () => (
    console.log(ticketmaster(key).discovery.v2.event.all().then(console.log))
    // ticketmaster(key).discovery.v2.event.all()
    //     .then(res=>{
    //         console.log(res)
    //     })
)
