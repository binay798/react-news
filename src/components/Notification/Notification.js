import { useEffect } from 'react'
import classes from './Notification.module.scss';
import { useStore } from "./../../store/store"

function Notification() {
    const [store,dispatch] = useStore();

    // hide notification after some interval
    useEffect(() => {
        let interval = setTimeout(() => {
            dispatch({type: 'HIDE_NOTIFICATION'})
            
        },5000)

        return () => clearTimeout(interval);
    },[store.notification.status,dispatch])

    const notificationStyle = {
        display: store.notification.status ? 'flex' : 'none'
    }

    const closeNotification = () => {
        dispatch({type: 'HIDE_NOTIFICATION'})
    }

    
    return (
        <div className={classes.notification} style={notificationStyle}>
            <span>{store.notification.content}</span>
            <span onClick={closeNotification}>close</span>
        </div>
    )
}

export default Notification;