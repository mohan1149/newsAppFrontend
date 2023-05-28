import React, { useState } from 'react';
import { useStore } from 'react-redux';
import { setProfile } from '../../reducer/appReducer';
import { addToPreferences } from '../../apis/apis';
const Sidebar = (props) => {
    const uid = localStorage.getItem('_uid');
    const store = useStore();
    let authors = store.getState().app.authors;
    authors = authors.filter(value => value !== null);
    authors = authors.filter((value, index, self) => {
        return value !== null && index === self.indexOf(value);
    });
    let sources = store.getState().app.sources;
    sources = sources.filter(value => value !== null);
    sources = sources.filter((value, index, self) => {
        return value !== null && index === self.indexOf(value);
    });
    let categories = store.getState().app.categories;
    categories = categories.filter(value => value !== null);
    categories = categories.filter((value, index, self) => {
        return value !== null && index === self.indexOf(value);
    });


    const addToPreferencesCheck = (item, type) => {
        if (uid !== null && uid !== undefined) {
            switch (type) {
                case 'author':
                    addPreferredAuthor(item, type);
                    break;
                case 'source':
                    addPreferredSource(item, type);
                    break;
                case 'category':
                    addPreferredCategory(item, type);
                    break;
            }
        }
    }
    const addPreferredAuthor = (item, type) => {
        let prefrredAuthors = store.getState().app.profile.preferred_authors;
        if (prefrredAuthors === null) {
            //add item to empty list
            let authors = [];
            authors.push(item);
            addToPreferences(authors, type, uid)
                .then((res) => {
                    store.dispatch(setProfile(res.data));
                });
        } else {
            let existingAuthors = store.getState().app.profile.preferred_authors;
            existingAuthors = JSON.parse(existingAuthors);
            let index = existingAuthors.indexOf(item);
            if (index === -1) {
                //add item item existing list
                existingAuthors.push(item);
                addToPreferences(existingAuthors, type, uid)
                    .then((res) => {
                        store.dispatch(setProfile(res.data));
                    });
            }
        }
    }
    const addPreferredSource = (item, type) => {
        let prefrredSources = store.getState().app.profile.preferred_sources;
        if (prefrredSources === null) {
            //add item to empty list
            let sources = [];
            sources.push(item);
            addToPreferences(sources, type, uid)
                .then((res) => {
                    store.dispatch(setProfile(res.data));
                });
        } else {
            let existingSources = store.getState().app.profile.preferred_sources;
            existingSources = JSON.parse(existingSources);
            let index = existingSources.indexOf(item);
            if (index === -1) {
                //add item item existing list
                existingSources.push(item);
                addToPreferences(existingSources, type, uid)
                    .then((res) => {
                        store.dispatch(setProfile(res.data));
                    });
            }
        }
    }
    const addPreferredCategory = (item, type) => {
        let prefrredCategories = store.getState().app.profile.preferred_categories;
        if (prefrredCategories === null) {
            //add item to empty list
            let categories = [];
            categories.push(item);
            addToPreferences(categories, type, uid)
                .then((res) => {
                    store.dispatch(setProfile(res.data));
                });
        } else {
            let existingCategories = store.getState().app.profile.preferred_categories;
            existingCategories = JSON.parse(existingCategories);
            let index = existingCategories.indexOf(item);
            if (index === -1) {
                //add item item existing list
                existingCategories.push(item);
                addToPreferences(existingCategories, type, uid)
                    .then((res) => {
                        store.dispatch(setProfile(res.data));
                    });
            }
        }
    }


    return (
        <div className='w3-container'>
            <h3 className='sidebar_title'>Top Authors</h3>
            <div>
                {authors.map((author, index) => {
                    return (
                        <button key={index} className='author-btn'
                            onClick={() => {
                                addToPreferencesCheck(author, 'author');
                            }}
                        >{author}</button>
                    );
                })}
            </div>
            <h3 className='sidebar_title'>Best Sources</h3>
            <div>
                {sources.map((source, index) => {
                    return (
                        <button key={index} className='author-btn'
                            onClick={() => {
                                addToPreferencesCheck(source, 'source');
                            }}
                        >{source}</button>
                    );
                })}
            </div>
            <h3 className='sidebar_title'>Categories</h3>
            <div>
                {categories.map((category, index) => {
                    return (
                        <button key={index} className='author-btn'
                            onClick={() => {
                                addToPreferencesCheck(category, 'category');
                            }}
                        >{category}</button>
                    );
                })}
            </div>
        </div>
    );
}
export default Sidebar;