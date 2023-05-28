import urls from './urls';
import axios from './axios';
export const getLoggedInProfile = async (uid) => {
    let response = await axios({
        method: 'GET',
        url: urls.server + urls.profile + uid,
    })
        .then((res) => {
            return res.data;
        })
        .catch((e) => {
            return {
                code: 500,
                msg: e.message,
            }
        });
    return response;
}
export const login = async (data) => {
    let response = await axios({
        method: 'POST',
        url: urls.server + urls.login,
        data: data,
    })
        .then((res) => {
            return res.data;

        })
        .catch((e) => {
            return {
                code: 500,
                msg: e.message,
            }
        });
    return response;
}
export const register = async (data) => {
    let response = await axios({
        method: 'POST',
        url: urls.server + urls.register,
        data: data,
    })
        .then((res) => {
            return res.data;
        })
        .catch((e) => {
            return {
                code: 500,
                msg: e.message,
            }
        });
    return response;
}
export const getNews = async (data) => {
    let response = await axios({
        method: 'POST',
        url: urls.server + urls.news,
        data: data,
    })
        .then((res) => {
            return res.data;
        })
        .catch((e) => {
            return {
                code: 500,
                msg: e.message,
            }
        });
    return response;
}
export const addToPreferences = async (list, type, uid) => {
    let response = await axios({
        method: 'POST',
        url: urls.server + urls.add_to_preferences,
        data: {
            list: JSON.stringify(list),
            type: type,
            uid: uid,
        },
    })
        .then((res) => {
            return res.data;
        })
        .catch((e) => {
            return {
                code: 500,
                msg: e.message,
            }
        });
    return response;
}
export const updateAccount = async (data) => {
    let response = await axios({
        method: 'POST',
        url: urls.server + urls.update_account,
        data: data,
    })
        .then((res) => {
            return res.data;
        })
        .catch((e) => {
            return {
                code: 500,
                msg: e.message,
            }
        });
    return response;
}
