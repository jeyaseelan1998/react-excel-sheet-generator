import { get } from 'lodash';
import Cookies from 'universal-cookie';

export const getCookie = (cookiename = "token", parseJson = false) => {
    // Get name followed by anything except a semicolon
    var cookiestring = RegExp(cookiename + "=[^;]+").exec(document.cookie);
    // Return everything after the equal sign, or an empty string if the cookie name not found
    cookiestring = decodeURIComponent(cookiestring ? cookiestring.toString().replace(/^[^=]+./, "") : "");
    if (parseJson && cookiestring) {
        cookiestring = JSON.parse(cookiestring);
    }
    return cookiestring || "";
}

export const setCookie = (value, cookiename = "token") => {
    const cookies = new Cookies();
    cookies.set(cookiename, value, {
        path: "/",
        secure: true,
        expires: new Date(Date.now() + (7 * 24 * 60 * 60 * 1000)),    // 7 days
        sameSite: 'Strict'
    });
}

export const deleteCookie = (cookiename = "token") => {
    const cookies = new Cookies();
    cookies.remove(cookiename, {
        path: "/",
        secure: true,
        sameSite: 'Strict'
    });
}

export const isSuperAdmin = (user) => {
    return get(user, 'role') === import.meta.env.VITE_APP_SUPER_ADMIN;
}