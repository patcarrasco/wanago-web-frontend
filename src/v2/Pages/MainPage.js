import React from 'react'
import MapContainer from '../Components/MapContainer/MapContainer';
import Navbar from '../Components/Navbar/Navbar';
import EventFeed from '../Components/EventFeed/EventFeed';
import { Container, Segment, Responsive, Header } from 'semantic-ui-react';


function MainPage(props) {
        return (
                <>
                <Responsive minWidth="866">
                        <Navbar/>
                </Responsive>
                <Responsive maxWidth="865">
                        <Segment>
                                <Header>
                                        Mobile Navbar
                                </Header>
                        </Segment>
                </Responsive>
                <div style={{backgroundColor:'red', height:'91vh', position: 'relative'}}>
                        <MapContainer/>  
                        <EventFeed />
                </div>
                </>
        )  
}

export default MainPage