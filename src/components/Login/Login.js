import { useRef, useState } from 'react'
import classes from './Login.module.scss';
import { backendApi as axios } from './../../axios/axiosInstance';
import { useStore } from './../../store/store';
import { withRouter } from 'react-router-dom'


function Login(props) {
    const dispatch = useStore()[1];
    const [loading,setLoading] = useState(false);
    const emailRef = useRef();
    const passwordRef = useRef();

    const submitHandler = async (e) => {
        setLoading(true)
        e.preventDefault()
        dispatch({type: 'HIDE_NOTIFICATION'});
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        if(email.trim() !== '' && password.trim() !== '') {
            try {
                
                const res = await axios.post('/api/v1/users/login',{email,password})
                if(res.data.status === 'fail') throw new Error(res.data.message)
                dispatch({type: 'SET_NOTIFICATION',payload: 'Logged in successfully'})
                // reset input field
                emailRef.current.value = '';
                passwordRef.current.value = '';

                setLoading(false)
                dispatch({type: 'AUTH_USER',payload: res.data.user})
                props.history.push('/')

            } catch(err) {
                console.log(err.message)
                dispatch({type: 'SET_NOTIFICATION',payload: err.response?.data.message || err.message})
                // reset input field
                emailRef.current.value = '';
                passwordRef.current.value = '';
                setLoading(false)
            }
        }
        // setLoading(false)
    }
    return (
        <div className={`${classes.login} card p-4`}>
            <h3 className="display-4 text-center mb-4">Login</h3>
            <form onSubmit={submitHandler}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" ref={emailRef} id="email" className="form-control form-control-lg" autoComplete={'off'} />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" ref={passwordRef} id="password" className="form-control form-control-lg" />
                </div>
                <button disabled={loading} className="btn btn-primary w-100" style={{fontSize: '1.6rem'}}>
                    {loading ? 'Processing' : 'Submit'}
                </button>
            </form>
        </div>
    )
}

export default withRouter(Login);