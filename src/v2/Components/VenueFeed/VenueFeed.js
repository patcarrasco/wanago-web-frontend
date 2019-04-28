import React, { PureComponent } from 'react'
import {connect} from 'react-redux'
import {selectVenue} from '../../../store/actions/venueActions'

import { Segment, Header, Grid, Dimmer, Loader, Responsive} from 'semantic-ui-react';
import VenueCard from '../VenueCard/VenueCard';
import VenueInfo from '../VenueInfo/VenueInfo';
import HideButton from '../HideButton/HideButton';



class VenueFeed extends PureComponent {
    state={localVenuesSaved: false, showVenueInfo: false, scrollResetPos: null, show: true}

    componentDidMount(){
        if (!!localStorage.getItem('localVenues')) {
            this.setState({localVenuesSaved: true})
        }
    }


    componentDidUpdate(prevProps, prevState) {
        if (prevProps.showVenue !== this.props.showVenue) {
            this.setState({localVenuesSaved: true})
        }

        if (this.props.showVenue === false) {
            this.setState({showVenueInfo: false})
            if(!this.state.show) {
                this.setState({show: true})
            }
        }
    }
    

    localVenueCards() {
        return JSON.parse(localStorage.getItem("localVenues")).map(ven => <VenueCard key={ven.key} {...ven} showVenueInfoHandler={this.showVenueInfoHandler}/>)
    }

    venues = () => {
        if (this.state.localVenuesSaved && this.props.showVenue) {
            if (this.localVenueCards().length < 1) {
                return <div style={
                    {
                        fontSize: '22px'
                    }
                }>      
                    <br/>             
                    < p > We couldn't find any venues nearby :( <br/> <span style={{fontSize:'14px'}}>Search for events in a nearby city!</span></p>
                    <br/>
                </div>
            } 
            return this.localVenueCards()
        }
    }

    showVenueInfoHandler = () => {
        const pos = document.getElementsByClassName('segment content-box')[0].scrollTop
        this.setState({showVenueInfo: true, scrollResetPos: () => document.getElementsByClassName('segment content-box')[0].scrollTop = pos })
    }

    closeVenueInfoHandler = () => {
        this.props._deselectVenue()
        this.setState({showVenueInfo: false}, () => this.state.scrollResetPos())
    } 

    mobileView = () => (
        <>
            < Segment className = {
                'content-box'
            }
                style = 
                    {
                        {
                            maxHeight: '30vh',
                            minHeight: '30vh',
                            minWidth: "-webkit-fill-available",
                            maxWidth: '-webkit-fill-available',
                            overflow:'auto', 
                            borderRadius:'unset', 
                            marginLeft:'14px', 
                            marginRight:'14px',
                            paddingBottom: '0',
                            marginBottom: '0px',
                            display: this.state.show ? 'block' : 'none' 
                        }
                    }
            >
                {   
                    !this.state.showVenueInfo 
                ?
                    <>
                        <Header as='h2'style={{color:"#3c3744"}}>Venues near you</Header>
                        <Grid columns={2}>
                            {this.venues()}
                            <Dimmer active={!!!localStorage.getItem("localVenues")}>
                                <Loader size='mini'></Loader>
                            </Dimmer>
                        </Grid>
                    </>
                :
                    <VenueInfo closeVenueInfoHandler={this.closeVenueInfoHandler}/>
                }
            </Segment>
            <HideButton toggle={()=>this.setState({show:!this.state.show})} show={this.state.show} />
        </>
    )

    midView = () => (
        < Segment className = {
            'content-box'
        }
            style = 
                {
                    {
                        maxHeight: '30vh',
                        minHeight: '15vh',
                        minWidth: "402px",
                        maxWidth: '402px',
                        overflow:'auto', 
                        borderRadius:'unset', 
                        marginLeft:'14px', 
                    }
                }
        >
            {   
                !this.state.showVenueInfo 
            ?
                <>
                    <Header as='h2'style={{color:"#3c3744"}}>Venues near you</Header>
                    <Grid columns={2}>
                    {this.venues()}
                    <Dimmer active={!!!localStorage.getItem("localVenues")}>
                        <Loader indeterminate size='mini'></Loader>
                    </Dimmer>
                    </Grid>
                </>
            :
                <VenueInfo closeVenueInfoHandler={this.closeVenueInfoHandler}/>
            }
        </Segment>
    )

    desktopView = () => (
        <Segment className={'content-box'} style={{maxWidth: "41%", minWidth:"41%", maxHeight:"81.5%", overflow:'auto', position:'fixed', borderRadius:'unset', marginLeft:'14px', marginTop: '14px'}}  >
            {
                !this.state.showVenueInfo ?
                <>
                    <Header as='h2'style={{color:"#3c3744"}}>Venues near you</Header>
                    <Grid columns={2} >
                        {this.venues()}
                        <Dimmer active={!!!localStorage.getItem("localVenues")}>
                            <Loader indeterminate size='small'></Loader>
                        </Dimmer>
                    </Grid>
                </>
                    :
                    <VenueInfo closeVenueInfoHandler={this.closeVenueInfoHandler}/>
            }
        </Segment>
    )

    feed = () => (
        <>
           <Responsive style={{display:'grid'}} minWidth={1000}>
                {this.desktopView()}
            </Responsive>
            <Responsive style={{display:'grid'}} maxWidth={999} minWidth={480}>
                {this.midView()}
            </Responsive>
            <Responsive style={{display:'grid'}} maxWidth={479}>
                {this.mobileView()}
            </Responsive>
        </>
    )

    closeVenueFromMapHandler = () => {
        this.props._deselectVenue()
        this.setState({showVenueInfo: false})
    }

    venueFromMap = () => (
        <>
            <Responsive minWidth={1000}>
                <Segment style={{maxWidth: "41%", minWidth:"41%", maxHeight:"81.5%", minHeight:"81.5%", overflow:'auto', position:'fixed', borderRadius:'unset', marginLeft:'14px'}}>
                    <VenueInfo closeVenueInfoHandler={this.closeVenueFromMapHandler} />
                </Segment>
            </Responsive>
            <Responsive maxWidth={999} minWidth={480}>
                <Segment style={{maxHeight:"30vh", minHeight: "15vh", minWidth:'402px', maxWidth:"402px", overflow:'auto', position:'fixed', borderRadius:'unset', marginLeft:'14px'}}>
                    <VenueInfo closeVenueInfoHandler={this.closeVenueFromMapHandler} />
                </Segment>
            </Responsive>
            <Responsive maxWidth={479}>
               <Segment style={{maxHeight:"71vh", minHeight: "30vh", minWidth:'-webkit-fill-available', overflow:'auto', position:'fixed', borderRadius:'unset', marginLeft:'14px', marginRight:'14px'}}>
                    <VenueInfo closeVenueInfoHandler={this.closeVenueFromMapHandler} />
                </Segment>
            </Responsive>
        </>
    )


    render() {
        if (this.props.venueSelected && !this.props.showVenue) {
            return this.venueFromMap()
        }
        return this.props.showVenue ? this.feed() : null
    }
}

const mapStateToProps = (state) => ({
    showVenue: state.navbar.showVenue,
    venueSelected: !!state.venue.selectedVenue
})

const mapDispatchToProps = (dispatch) => ({
    _deselectVenue: () => dispatch(selectVenue(false))
})

export default connect(mapStateToProps, mapDispatchToProps)(VenueFeed)