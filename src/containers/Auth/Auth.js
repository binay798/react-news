import Login from '../../components/Login/Login';
import Signup from '../../components/Signup/Signup'
import classes from './Auth.module.scss';
import { Route } from 'react-router-dom'
function Auth() {
    return (
        <div className={classes.auth}>
            <Route path="/accounts/login" component={Login} />
            <Route path="/accounts/signup" component={Signup} />

        </div>
    )
}

export default Auth;