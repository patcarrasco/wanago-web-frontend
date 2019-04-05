import React from 'react'
import { Card, Image } from 'semantic-ui-react'

export function EventCard(props) {
    const {name, image} = props
    
    return (
        <Card fluid size='small'>
            <Image src={image}/>
            <Card.Content>
                <Card.Header>{name}</Card.Header>
                <Card.Meta>artist name</Card.Meta>
            </Card.Content>
        </Card>
    )
}