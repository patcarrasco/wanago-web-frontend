import React from 'react'
import { Icon } from 'semantic-ui-react';


const style = {
  height:'30px',
  backgroundColor: '#B4C5E4',
  width: '60px', 
  justifySelf: 'center',
  borderBottomLeftRadius: "60px",
  borderBottomRightRadius: "60px",
  textAlign: 'center',
  // fontSize:'12px'
}

const HideButton = (props) => {

  return (
    <div style={style} onClick={props.toggle}>
        <Icon name={props.show ? 'angle up' : 'angle down'} size='large'/>
    </div>
  )

}


export default HideButton