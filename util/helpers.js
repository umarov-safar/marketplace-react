import {AuthLocalStorageKeys, MILLISECOND_TO_SECOND} from "./constants";

export const updateAuthInfo = (data) => {
    const {expires_in, refresh_token, access_token} = data.data;
    localStorage.setItem(
        AuthLocalStorageKeys.EXPIRES_AT,
        (Date.now() / MILLISECOND_TO_SECOND + +expires_in).toString()
    );
    localStorage.setItem(AuthLocalStorageKeys.REFRESH_TOKEN, refresh_token);
    localStorage.setItem(AuthLocalStorageKeys.TOKEN, access_token);
    localStorage.setItem(AuthLocalStorageKeys.EXPIRES_IN, expires_in.toString());
    localStorage.setItem(AuthLocalStorageKeys.LOGGED_IN, true)
    return data;
};


export const deleteAuthInfo = () => {
    localStorage.removeItem(AuthLocalStorageKeys.EXPIRES_AT);
    localStorage.removeItem(AuthLocalStorageKeys.REFRESH_TOKEN);
    localStorage.removeItem(AuthLocalStorageKeys.TOKEN);
    localStorage.removeItem(AuthLocalStorageKeys.EXPIRES_IN);
    localStorage.removeItem(AuthLocalStorageKeys.LOGGED_IN);
};


export const getAuthInfoFromLocalStorage = () => {
    const expires_at = localStorage.getItem(AuthLocalStorageKeys.EXPIRES_AT);
    const refresh_token = localStorage.getItem(AuthLocalStorageKeys.REFRESH_TOKEN) || '';
    const access_token = localStorage.getItem(AuthLocalStorageKeys.TOKEN) || '';
    return {expires_at, refresh_token, access_token};
};


// declare all characters
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const generateString = (len) => {
    let result = '';
    for (let i = 0; i < len; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
}


