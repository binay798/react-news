import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Notification from '../../components/Notification/Notification';
import classes from './Layout.module.scss';
import { withRouter } from 'react-router-dom'

function Layout(props) {



    return (
        <div className={classes.layout}>
            {/* Header */}
            <Header />
            <Notification />
            <div className={`${classes.main} container mt-4`}>
                {props.children}
            </div>
            
            {/* footer */}
            <Footer />
        </div>
    )
}

export default withRouter(Layout);