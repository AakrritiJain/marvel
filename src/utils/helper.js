import {Config} from "./config";
import md5 from "md5";

export const getURL = ({endpoint, search}) => {
    let url = `${Config["prod"].API_URL}/${endpoint}`;
    const ts = Date.now();
    const hash = md5(ts + Config["prod"].API_KEY_PRIVATE + Config["prod"].API_KEY_PUBLIC)
    url = `${url}?ts=${ts}&apikey=${Config["prod"].API_KEY_PUBLIC}&hash=${hash}`;
    if (search)
        url = `${url}&${search}`;
    return url;
}

export const debounce = (func, wait = 0) => {
    let timeout;
    return function (...args) {
        const context = this
        clearTimeout(timeout)
        timeout = setTimeout(() => func.apply(context, args), wait)
    }
}