import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from 'react-redux';
import { setNews } from '../../reducer/appReducer';
import { getNews } from '../../apis/apis';
import Sidebar from '../home/Sidebar';
const Header = (props) => {
    const store = useStore();
    const [logged, setLoggedStaus] = useState(store.getState().app.logged);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState();
    const [showSidebar, setShowSidebar] = useState(false);
    store.subscribe(() => {
        if (store.getState().app.logged) {
            setLoggedStaus(true);
        } else {
            setLoggedStaus(false);
        }
    })
    const reloadNews = () => {
        let data = {
            query: search,
            uid: localStorage.getItem('_uid') !== null ? localStorage.getItem('_uid') : 0,
        }
        setLoading(true);
        getNews(data)
            .then((res) => {
                store.dispatch(setNews(res.data));
                setLoading(false);
            });

    }
    return (
        <nav className='app-nav' id="header">
            <div className="w3-animate-left w3-sidebar w3-card w3-hide-large w3-hide-medium"
                style={{
                    width: '70%',
                    display: showSidebar ? 'block' : 'none',
                }}
            >
                <div className='w3-theme-d2'>
                    {
                        !logged &&
                        <div>
                            <Link to="/register" className='w3-bar-item link w3-block w3-margin'><i className="fa fa-user w3-margin-right"></i>Register</Link>
                            <Link to="/login" className='w3-bar-item link w3-block w3-margin'><i className="fa fa-lock w3-margin-right"></i>Login</Link>
                        </div>
                    }
                    {
                        logged &&
                        <div>
                            <Link to="/profile" className='w3-bar-item link w3-block w3-margin'><i className="fa fa-user w3-margin-right"></i>My Profile</Link>
                            <Link to="/logout" className='w3-bar-item link w3-block w3-margin'><i className="fa fa-lock w3-margin-right"></i>Logout</Link>
                        </div>
                    }
                    <input type="text" className='w3-bar-item w3-input w3-border' placeholder='Search here..'
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                        }}
                    />
                     <button className='w3-btn w3-bar-item w3-btn w3-margin-top w3-teal'
                        onClick={() => {
                            setShowSidebar(!showSidebar);
                            reloadNews();
                        }}
                    >Search{loading && <i className="fa fa-spinner w3-spin"></i>}</button>
                    <Sidebar/>
                </div>

            </div>
            <div className="w3-top w3-teal" >
                <div className="w3-bar w3-theme-d2 w3-left-align w3-large">
                    <button
                        onClick={() => {
                            setShowSidebar(!showSidebar);
                        }}
                        className="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-theme-d2"><i className="fa fa-bars"></i></button>
                    <Link to="/" className='w3-bar-item link'><i className="fa fa-home w3-margin-right"></i>Home</Link>
                    {
                        !logged &&
                        <Link to="/login" className='w3-bar-item w3-right w3-hide-small link'><i className="fa fa-lock w3-margin-right"></i>Login</Link>
                    }
                    {
                        !logged &&
                        <Link to="/register" className='w3-bar-item w3-right w3-hide-small link'><i className="fa fa-lock w3-margin-right"></i>Register</Link>
                    }
                    <button className='w3-btn w3-bar-item w3-right w3-hide-small'
                        onClick={() => {
                            reloadNews();
                        }}
                    >Search{loading && <i className="fa fa-spinner w3-spin"></i>}</button>
                    <input type="text" className='w3-bar-item w3-right  w3-hide-small' placeholder='Search here..'
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                        }}
                    />

                    {
                        logged &&
                        <Link to="/logout" className='w3-bar-item w3-right w3-hide-small link'><i className="fa fa-lock w3-margin-right"></i>Logout</Link>
                    }
                    {
                        logged &&
                        <Link to="/profile" className='w3-bar-item w3-right w3-hide-small link'><i className="fa fa-user w3-margin-right"></i>My Profile</Link>
                    }
                </div>
            </div>
        </nav>
    );
}

export default Header;