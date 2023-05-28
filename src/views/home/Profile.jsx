import React, { useState } from 'react';
import { addToPreferences, updateAccount } from './../../apis/apis';
import { useStore } from 'react-redux';
import { setProfile } from '../../reducer/appReducer';
const Profile = () => {
    const uid = localStorage.getItem('_uid');
    const store = useStore();
    const [profile, setUserProfile] = useState(store.getState().app.profile);
    const [username, setUsername] = useState(profile.name);
    const [oldPassword, setOldPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [loading, setLoading] = useState(false);
    const [authors, setAuthors] = useState(profile.preferred_authors !== null ? JSON.parse(profile.preferred_authors) : []);
    const [sources, setSources] = useState(profile.preferred_sources !== null ? JSON.parse(profile.preferred_sources) : []);
    const [categories, setCategories] = useState(profile.preferred_categories !== null ? JSON.parse(profile.preferred_categories) : []);
    store.subscribe(() => {
        setUserProfile(store.getState().app.profile);
        setAuthors(JSON.parse(store.getState().app.profile.preferred_authors));
        setSources(JSON.parse(store.getState().app.profile.preferred_sources));
        setCategories(JSON.parse(store.getState().app.profile.preferred_categories));
    });
    const removeToPreferencesCheck = (item, type) => {
        switch (type) {
            case 'author':
                removePreferredAuthor(item, type);
                break;
            case 'source':
                removePreferredSource(item, type);
                break;
            case 'category':
                removePreferredCategory(item, type);
                break;
        }
    }
    const removePreferredAuthor = (item, type) => {
        let existingAuthors = store.getState().app.profile.preferred_authors;
        existingAuthors = JSON.parse(existingAuthors);
        let index = existingAuthors.indexOf(item);
        existingAuthors.splice(index, 1);
        addToPreferences(existingAuthors, type, uid)
            .then((res) => {
                store.dispatch(setProfile(res.data));
            });
    }
    const removePreferredSource = (item, type) => {
        let existingSources = store.getState().app.profile.preferred_sources;
        existingSources = JSON.parse(existingSources);
        let index = existingSources.indexOf(item);
        existingSources.splice(index, 1);
        addToPreferences(existingSources, type, uid)
            .then((res) => {
                store.dispatch(setProfile(res.data));
            });
    }

    const removePreferredCategory = (item, type) => {
        let existingCategories = store.getState().app.profile.preferred_categories;
        existingCategories = JSON.parse(existingCategories);
        let index = existingCategories.indexOf(item);
        existingCategories.splice(index, 1);
        addToPreferences(existingCategories, type, uid)
            .then((res) => {
                store.dispatch(setProfile(res.data));
            });
    }
    const updateUserAccount = (e) => {
        setLoading(true);
        e.preventDefault();
        let data = {
            name:username,
            email:profile.email,
            password:oldPassword,
            newPassword:newPassword,
        }
        updateAccount(data)
        .then((res)=>{
            setLoading(false);
            window.location.reload();
        })
    }

    return (
        <div>
            <h2>
                <strong className='w3-opacity'>Hello..</strong>
            </h2>
            <h2>{profile.name}</h2>
            <div className="w3-container w3-card">
                <h3 className='w3-opacity'>
                    Account Information
                </h3>
                <div className="w3-row">
                    <div className="w3-half">
                        <form action=""
                            onSubmit={(e) => {
                                updateUserAccount(e);
                            }}
                        >
                            <input type="text" value={username} className="w3-input w3-border w3-margin" required placeholder='User Name'
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                }}
                            />
                            <input type="password" className="w3-input w3-border w3-margin" required placeholder='Current Password'
                                onChange={(e) => {
                                    setOldPassword(e.target.value);
                                }}
                            />
                            <input type="password" className="w3-input w3-border w3-margin" required placeholder='New Password'
                                onChange={(e) => {
                                    setNewPassword(e.target.value);
                                }}
                            />
                            <input type="submit" className='w3-btn w3-teal w3-margin' value="Update Account" />{loading && <i className="fa fa-spinner w3-spin"></i>}
                        </form>
                    </div>
                </div>
                <h3 className='w3-opacity'>
                    Account Preferences
                </h3>
                <h5>Prefrred Authors</h5>
                <div>
                    {authors.length === 0 &&
                        <h6 className="w3-text-red">No Preferred Authors</h6>
                    }
                    {
                        authors.map((author, index) => {
                            return (
                                <button
                                    onClick={() => {
                                        removeToPreferencesCheck(author, 'author');
                                    }}
                                    key={index}
                                    className="w3-btn w3-teal w3-margin"
                                >{author} <i className='fa fa-times'></i></button>
                            );
                        })
                    }
                </div>
                <h5>Prefrred Sources</h5>
                <div>
                    {sources.length === 0 &&
                        <h6 className="w3-text-red">No Preferred Sources</h6>
                    }
                    {
                        sources.map((source, index) => {
                            return (
                                <button
                                    onClick={() => {
                                        removeToPreferencesCheck(source, 'source');
                                    }}
                                    key={index}
                                    className="w3-btn w3-teal w3-margin"
                                >{source} <i className='fa fa-times'></i></button>
                            );
                        })
                    }
                </div>
                <h5>Prefrred Categories</h5>
                <div>
                    {categories.length === 0 &&
                        <h6 className="w3-text-red">No Preferred Categories</h6>
                    }
                    {
                        categories.map((category, index) => {
                            return (
                                <button
                                    onClick={() => {
                                        removeToPreferencesCheck(category, 'category');
                                    }}
                                    key={index}
                                    className="w3-btn w3-teal w3-margin"
                                >{category} <i className='fa fa-times'></i></button>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}
export default Profile;