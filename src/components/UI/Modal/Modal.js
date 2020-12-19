import React from 'react'
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.module.scss';


function Modal(props) {
    const modaldropStyle = {
        opacity: props.show ? '1' : '0',
        visibility: props.show ? 'visible' : 'hidden'
    }
    return (
        <>
            <div className={classes.modal} style={modaldropStyle}>
                {props.children}

                <span onClick={props.hide}>close</span>
            </div>
            <Backdrop show={props.show} opacity={props.opacity} hide={props.hide} />
        </>
    )
}

export default Modal
