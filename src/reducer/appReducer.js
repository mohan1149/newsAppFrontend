import { createSlice } from '@reduxjs/toolkit'
export const appReducer = createSlice({
    name: 'appReducer',
    initialState: {
        logged: false,
        lang: 'en',
        user: localStorage.getItem('_uid') !== null ? localStorage.getItem('_uid') : null,
        categories: [],
        sources: [],
        authors: [],
        news: [],
    },
    reducers: {
        setProfile: (state, action) => {
            state.profile = action.payload
        },
        setLogged: (state, action) => {
            state.logged = action.payload
        },
        setAuthors: (state, action) => {
            state.authors = action.payload
        },
        setSources: (state, action) => {
            state.sources = action.payload
        },
        setCategories: (state, action) => {
            state.categories = action.payload
        },
        setNews: (state, action) => {
            state.news = action.payload
        },
    }
})
export const { setProfile, setLogged ,setNews,setAuthors,setSources,setCategories} = appReducer.actions

export default appReducer.reducer