import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const getCookie = (key = 'token') => cookies.get(key);

export const setCookie = (key = 'token', value, options) => cookies.set(key, value, options);
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