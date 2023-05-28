import React, { useEffect, useState } from "react";
import Splash from './../views/splash/Splash';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './../views/auth/Login';
import Register from './../views/auth/Register';
import NotFound from './../views/error/NotFound';
import Header from './../views/home/Header';
import Sidebar from './../views/home/Sidebar';
import Profile from './../views/home/Profile';
import Home from './../views/home/Home';
import ViewNews from './../views/home/ViewNews';
import { useStore } from 'react-redux';
import { getNews } from './../apis/apis';
import { setLogged, setProfile, setNews, setAuthors, setCategories, setSources } from "../reducer/appReducer";
import Logout from './../views/auth/Logout';
const AppRouter = () => {
    const [spalsh, setSplash] = useState(true);
    const store = useStore();
    useEffect(() => {
        let uid = localStorage.getItem('_uid');
        uid = uid === null ? 0 : uid;
        let data = {
            uid: uid,
            page:1,
        }
        getNews(data)
            .then((res) => {
                if (uid !== 0) {
                    store.dispatch(setProfile(res.profile));
                    store.dispatch(setNews(res.data));
                    store.dispatch(setAuthors(res.authors));
                    store.dispatch(setCategories(res.categories));
                    store.dispatch(setSources(res.sources));
                    store.dispatch(setLogged(true));
                }else{
                    store.dispatch(setNews(res.data));
                    store.dispatch(setAuthors(res.authors));
                    store.dispatch(setCategories(res.categories));
                    store.dispatch(setSources(res.sources));
                }
                setSplash(false);
            });
    }, []);
    if (spalsh) {
        return (
            <Splash />
        );
    }
    if (!spalsh) {
        return (
            <BrowserRouter>
                <Header />
                <div className="content" style={{ marginTop: '5rem' }}>
                    <div className="w3-row">
                        <div className="w3-col l2 w3-hide-small w3-hide-medium" id="sideMenu">
                            <Sidebar />
                        </div>
                        <div className="w3-col l10" id="appRoutes">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/view/:news" element={<ViewNews />} />
                                <Route path="/logout" element={<Logout />} />
                                <Route path="/*" element={<NotFound />} />
                            </Routes>
                        </div>
                        {/* <div className="w3-col l2 w3-hide-small">
                            sidemenu for
                        </div> */}
                    </div>
                </div>

            </BrowserRouter>
        );
    }
}
export default AppRouter;