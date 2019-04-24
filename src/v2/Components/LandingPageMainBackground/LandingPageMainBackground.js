import React from 'react'
import SignInForm from '../SignInForm/SignInForm';
import { Responsive } from 'semantic-ui-react';

import gradient from '../../assets/images/gradient.jpg'

const LandingPageMainBackground = () => {

    const desktop = () => (
        < div style = 
            {
                {
                    width: "auto",
                    height: "100vh",
                    minHeight: "100vh",
                    backgroundColor: '#3c3744',
                    backgroundImage: `url(${gradient})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "9em"
                }
            } 
        >
            < div style = {
                    {
                        border: "1px solid #fbfff1",
                        backgroundColor: '#3c3744',
                        backgroundImage: `url(${gradient})`,
                        minHeight: 'fit-content',
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }
                }
            >
                <div style=
                    {
                        {
                            alignItems:"center", 
                            marginBottom:'20px',
                            borderBottom:"solid",
                            borderColor: "#fbfff1",
                        }
                    }
                >
                    < h1 style = {
                            {
                                fontFamily: "Roboto, sans-serif",
                                fontWeight: "lighter",
                                fontSize: "8em",
                                color: "#fbfff1"
                            }
                        } 
                    > 
                        wanago 
                    </h1>
                </div>

                < div style = 
                    {
                        {
                            width: "max-content",
                            height: "20%",
                            justifySelf: "center",
                            display:"flex",
                            alignItems:"center",
                            justifyContent: "center",
                        }
                    } 
                >
                    < h2 style = 
                        {
                            {
                                fontFamily: "Roboto, san-serif",
                                fontSize: "50px",
                                color: "#fbfff1",
                                padding: '14px'
                            }
                        } 
                    >
                        Live tonight. Find events near you.      
                    </h2>
                </div>
                <div style = 
                    {
                        {
                            marginTop: '20px',
                            maxWidth:"40%",
                            minWidth:"40%"
                        }
                    }
                >
                    <SignInForm />
                </div>
            </div>
        </div>
        ) 

        const mobile = () => (
            < div style = {
                {
                    width: "auto",
                    maxHeight: "-webkit-fill-available",
                    minHeight: "-webkit-fill-available",
                    backgroundImage: `url(${gradient})`,
                    backgroundSize: 'cover',
                    backgroundPosition:'center',
                }
            } >
                <div style = {
                    {
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: "1em"
                    }
                }>
                    <div style={
                            {
                                flexDirection:"row", 
                                alignItems:"center", 
                                justifyContent:"space-between", 
                                alignContent:"flex-start",
                                borderBottom:"solid",
                                borderColor: "#fbfff1",
                                marginBottom: '14px'
                            }
                        }>
                        < h1 style = {
                            {
                                fontFamily: "Roboto, sans-serif",
                                fontWeight: "lighter",
                                fontSize: "6em",
                                color: "#fbfff1"
                            }
                        } > wanago </h1>
                    </div>

                    <div style={{maxWidth:'min-content'}}>
                        <SignInForm />
                    </div>

                </div>
            </div>
    )

    return (
        <>
            <Responsive minWidth={1000}>
                {desktop()}
            </Responsive>
            <Responsive maxWidth={999}>
                {mobile()}
            </Responsive>
        </>
    )


}

export default LandingPageMainBackground