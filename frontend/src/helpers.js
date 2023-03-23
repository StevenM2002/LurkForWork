import { BACKEND_PORT, BACKEND_URL } from "./config.js";

/**
 * Given a js file object representing a jpg or png image, such as one taken
 * from a html file input element, return a promise which resolves to the file
 * data as a data url.
 * More info:
 *   https://developer.mozilla.org/en-US/docs/Web/API/File
 *   https://developer.mozilla.org/en-US/docs/Web/API/FileReader
 *   https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
 * 
 * Example Usage:
 *   const file = document.querySelector('input[type="file"]').files[0];
 *   console.log(fileToDataUrl(file));
 * @param {File} file The file to be read.
 * @return {Promise<string>} Promise which resolves to the file as a data url.
 */
export function fileToDataUrl(file) {
    const validFileTypes = [ 'image/jpeg', 'image/png', 'image/jpg' ]
    const valid = validFileTypes.find(type => type === file.type);
    // Bad data, let's walk away.
    if (!valid) {
        throw Error('provided file is not a png, jpg or jpeg image.');
    }
    
    const reader = new FileReader();
    const dataUrlPromise = new Promise((resolve,reject) => {
        reader.onerror = reject;
        reader.onload = () => resolve(reader.result);
    });
    reader.readAsDataURL(file);
    return dataUrlPromise;
}

export function doFetch(endpoint, body, method, urlsearchparams=null, token=undefined, headers={'Content-Type': 'application/json'}) {
    return fetch(`${BACKEND_URL + ':' + BACKEND_PORT + endpoint}${urlsearchparams === null ? '' : '?' + new URLSearchParams(urlsearchparams)}`, {
        method: method,
        headers: {
            ...headers,
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body)
    }).then(res => res.json()).catch(e => e instanceof TypeError ? {error: 'No network detected'} : e);
}

export function fetchUser(userId) {
    return doFetch('/user', undefined, 'GET', { 'userId': userId }, window.localStorage.getItem('token'));
}

export function changeRoute(route) {
    location.href = route;
    window.dispatchEvent(new HashChangeEvent('hashchange'));
}

export function putWatchFetch(email, isWatch=true) {
    return doFetch('/user/watch', {'email': email, 'turnon': isWatch}, 'PUT', null, localStorage.getItem('token'));
}