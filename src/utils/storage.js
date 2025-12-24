import Cookies from 'universal-cookie';

const cookies = new Cookies(null, { path: '/' });

export const getCookie = (key = 'token') => cookies.get(key);

export const deleteCookie = (key = 'token') => cookies.remove(key);

export const setCookie = (value, key = 'token', options = { expires: 1 }) => cookies.set(key, value, options);
// OPTIONS arg
// {
//     path?: string;
//     expires?: Date;
//     maxAge?: number;
//     domain?: string;
//     secure?: boolean;
//     httpOnly?: boolean;
//     sameSite?: boolean | 'none' | 'lax' | 'strict';
//     partitioned?: boolean;
// }