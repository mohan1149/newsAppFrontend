import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { login } from './../../apis/apis';
import { useStore } from 'react-redux';
import { setLogged, setProfile } from './../../reducer/appReducer';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const store = useStore();
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ status: false, msg: '' });

    useEffect(() => {
        document.getElementById('header').style.display = 'none';
        document.getElementById('sideMenu').style.display = 'none';
        document.getElementById('appRoutes').classList.remove('l10');
        document.getElementById('appRoutes').classList.add('l12');
        return () => {
            document.getElementById('header').style.display = 'block';
            document.getElementById('sideMenu').style.display = 'block';
            document.getElementById('appRoutes').classList.add('l10');
            document.getElementById('appRoutes').classList.remove('l12');
        };
    }, [])

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        let formData = {
            email: email,
            password: password,
        }
        login(formData)
            .then((res) => {
                if (res.status) {
                    localStorage.setItem('_uid', res.data.id);
                    store.dispatch(setProfile(res.data));
                    store.dispatch(setLogged(true));
                    navigate('/');
                } else {
                    setError({
                        status: true,
                        msg: res.msg,
                    });
                }
                setLoading(false);
            })
            .catch((e) => {
                setLoading(false);
            })
    }
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center'
            }}
        >
            <div className="rounded-10" id="login"
                style={{
                    display: 'contents',
                }}
            >
                <div className="w3-half w3-teal w3-container w3-card">
                    <div className="">
                        <h1>Login to continue..</h1>
                        <form className="w3-container w3-card w3-padding-32 w3-white"
                            onSubmit={(e) => {
                                handleLogin(e);
                            }}
                        >
                            <div className="w3-section">
                                <label>Email</label>
                                <input className="w3-input" type="text" required name="email"
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                    }}
                                />
                            </div>
                            <div className="w3-section">
                                <label>Password</label>
                                <input className="w3-input" type="password" required name="password"
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                    }}
                                />
                            </div>
                            {error.status &&
                                <span className='w3-text-red'>{error.msg}</span>
                            }
                            <button type="submit" className="w3-button w3-teal w3-right w3-large">Login {loading && <i className="fa fa-spinner w3-spin"></i>}</button>
                        </form>
                    </div>
                    <div className='w3-padding-64 w3-padding-large'>
                        <Link to="/register">Don't have account, Sign Up.</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Login;