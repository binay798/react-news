import React from 'react'
import classes from './Details.module.scss';
import { useStore } from './../../store/store'
import Modal from '../../components/UI/Modal/Modal';
import { withRouter } from 'react-router-dom'

function Details(props) {
    const globalStore = useStore()[0];
    const [showModal,setShowModal] = React.useState(false)
    
    const goToLoginPage = () => {
        props.history.push('/accounts/login')
    }
    React.useEffect(() => {
        window.scrollTo(0,0);

        if(!globalStore.auth) {
            setShowModal(true)
        }
    },[globalStore.auth])
    return (
        <>
        <Modal show={showModal} opacity={0.95}>
            <h2>Login to see details</h2>
            <button className="btn btn-primary w-100" onClick={goToLoginPage} style={{fontSize: '1.6rem',marginTop: '2rem'}}>
                    Login
            </button>
        </Modal>
        <div className={classes.details}>
            <h1>{globalStore.selectedNews?.title}</h1>
            <p><em>{`By ${globalStore.selectedNews?.source.name}`}</em></p>
            <em>Updated at {globalStore.selectedNews?.publishedAt}</em>
            <img src={globalStore.selectedNews?.urlToImage} alt="news"/>
            <p>
                {globalStore.selectedNews?.content}
            </p>
            <p>
                {globalStore.selectedNews?.description}
            </p>
        </div>
        </>
    )
}

export default withRouter(Details);
