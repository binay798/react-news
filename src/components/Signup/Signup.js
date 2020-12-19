import { useRef, useState } from 'react'
import classes from './Signup.module.scss';
import { backendApi as axios } from './../../axios/axiosInstance'
import { useStore } from './../../store/store';
import { withRouter } from 'react-router-dom'



const clearInputField = (username,email,password,confirmPassword) => {
    username.current.value = '';
    email.current.value = '';
    password.current.value = '';
    confirmPassword.current.value = '';
}
function Signup(props) {
    const dispatch = useStore()[1]
    const [loading,setLoading] = useState(false)
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const submitHandler = async (e) => {
        e.preventDefault()
        setLoading(true);
        dispatch({type: 'HIDE_NOTIFICATION'})
        const username = usernameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;
        if(username !== '' && email !== '' && password !== '' && confirmPassword !== '') {
            try {
                const info = {username,email,password,confirmPassword};
                const res = await axios.post('/api/v1/users/signup',info);
                console.log(res)
                if(res.data.status === 'fail') throw new Error(res.data.message);
                dispatch({type: 'SET_NOTIFICATION',payload: 'User created'})

                // clear input fields
                clearInputField(usernameRef,emailRef,passwordRef,confirmPasswordRef);
                setLoading(false);
                props.history.push('/')

            } catch(err) {
                console.log(err.response.data.message);
                dispatch({type: 'SET_NOTIFICATION',payload: err.response?.data.message || err.message})
                clearInputField(usernameRef,emailRef,passwordRef,confirmPasswordRef);

            }
        }
        setLoading(false);

        
    }
    return (
        <div className={`${classes.signup} card p-4`}>
            <h3 className="display-4 text-center mb-4">Signup</h3>
            <form onSubmit={submitHandler}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" id="username" ref={usernameRef} className="form-control form-control-lg" autoComplete={'off'} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" id="email" ref={emailRef} className="form-control form-control-lg" autoComplete={'off'} />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" id="password" ref={passwordRef} className="form-control form-control-lg" />
                </div>
                <div className="mb-5">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input type="password" id="confirmPassword" ref={confirmPasswordRef} className="form-control form-control-lg" />
                </div>
                <button disabled={loading} className="btn btn-primary w-100" style={{fontSize: '1.6rem'}}>
                    {loading ? 'Processing...' : 'Submit'}
                </button>
            </form>
        </div>
    )
}

export default withRouter(Signup);