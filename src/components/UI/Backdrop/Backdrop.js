import React from 'react'
import classes from './Backdrop.module.scss';


function Backdrop(props) {

    const backdropStyle = {
        opacity: props.show ? props.opacity || '0.5' : '0',
        visibility: props.show ? 'visible' : 'hidden'
    }
    return (
        <div className={classes.backdrop} style={backdropStyle} onClick={props.hide}>
            
        </div>
    )
}

export default Backdrop
