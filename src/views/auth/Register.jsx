import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { register } from '../../apis/apis';
import { setLogged, setProfile } from '../../reducer/appReducer';
import { useStore } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const navigate = useNavigate();
    const store = useStore();
    const [email, setEmail] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ status: false, msg: 'Error' });

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
    const handleRegister = (e) => {
        e.preventDefault();
        setLoading(true);
        let formData = {
            username: username,
            email: email,
            password: password,
        }
        register(formData)
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
                        <h1>Create New Account</h1>
                        <form className="w3-container w3-card w3-padding-32 w3-white"
                            onSubmit={(e) => {
                                handleRegister(e);
                            }}
                        >

                            <div className="w3-section">
                                <label>User Name</label>
                                <input className="w3-input" type="text" required name="username"
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="w3-section">
                                <label>Email</label>
                                <input className="w3-input" type="email" required name="email"
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="w3-section">
                                <label>Password</label>
                                <input className="w3-input" type="password" required name="password"
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="w3-section">
                                <label>Conform Password</label>
                                <input className="w3-input" type="password" required name="conformPassword"
                                    onChange={(e) => {
                                        if (e.target.value !== password) {
                                            setError({
                                                status: true,
                                                msg: 'Confirm Password is not same as Password',
                                            });
                                        } else {
                                            setError({
                                                status: false,
                                                msg: '',
                                            });
                                        }
                                        setConfirmPassword(e.target.value);
                                    }}
                                />
                            </div>
                            {error.status &&
                                <strong className='w3-text-red'>{error.msg}</strong>
                            }
                            <button type="submit" className="w3-button w3-teal w3-right w3-large">Register {loading && <i className="fa fa-spinner w3-spin"></i>}</button>
                        </form>
                    </div>
                    <div className='w3-padding-64 w3-padding-large'>
                        <Link to="/login">Already have an account, Login.</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Register;