import { useState } from 'react'
import classes from './Header.module.scss'
import { Link } from 'react-router-dom';
import { useStore } from './../../store/store';
import { withRouter } from 'react-router-dom'
import {backendApi as axios } from './../../axios/axiosInstance'
function Header(props) {

    const [globalStore,dispatch] = useStore();
    const [loading,setLoading] = useState(false)
    const toggleAuth = async() => {
        setLoading(true)
        if(globalStore.auth) {
            try {

                let res = await axios.get('/api/v1/users/logout');
                dispatch({type: 'LOGOUT'})
                dispatch({type: 'SET_NOTIFICATION',payload: res.data.data})
                setLoading(false);

            } catch(err) {
                console.log(err)
                setLoading(false);

            }

        } else {
            setLoading(false);
            props.history.push('/accounts/signup')
        }
    }
    return (
        <nav className={`${classes.header} navbar p-4 navbar-expand-lg navbar-dark bg-dark`}>
            <div className="container-fluid d-flex w-100 justify-content-between">
                <Link  className={`${classes.header__logo} navbar-brand`} to="/">News Portal</Link>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse"  id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to={globalStore.user ? '/' : '/accounts/login'}>
                                {globalStore.user ? `Hello ${globalStore.user.username}` : 'Login'}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <span style={{cursor: 'pointer'}} className="nav-link"  onClick={toggleAuth} >
                                {globalStore.auth ? (loading ? 'Logging out' : 'Logout') : 'Signup'}
                            </span>
                        </li>
                        
                    </ul>
                </div>
                
                
            </div>
        </nav>
    )
}

export default withRouter(Header);