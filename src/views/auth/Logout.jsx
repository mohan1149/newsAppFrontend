import React, { useEffect } from 'react';
import { useStore } from 'react-redux';
import { useNavigate } from 'react-router';
import { setLogged } from '../../reducer/appReducer';
const Logout = () => {
    const navigate = useNavigate();
    const store = useStore();
    useEffect(() => {
        store.dispatch(setLogged(false));
        localStorage.removeItem('_uid');
        navigate('/');
        window.location.reload();
    }, []);
    return (
        <></>
    );
}
export default Logout;