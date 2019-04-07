import React from 'react'
import MapContainer from '../Components/MapContainer/MapContainer';
import Navbar from '../Components/Navbar/Navbar';
import EventFeed from '../Components/EventFeed/EventFeed';
import { Container, Segment, Responsive, Header } from 'semantic-ui-react';


function MainPage(props) {
        return (
                <>
                        <div style={{height:'100%', backgroundColor:'white'}}>
                                <MapContainer/>  
                        </div>
                        <div style={{position:'fixed', width:'100%'}}>
                                <Navbar/>
                                <EventFeed />
                        </div>
                </>
        )  
}

export default MainPage