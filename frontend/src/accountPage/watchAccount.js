import { putWatchFetch } from "../helpers.js";

export const watchAccount = (email, isWatch=true) => {
    const mainDiv = document.createElement('div');
    const btn = document.createElement('button');
    btn.innerText = isWatch ? 'Watch' : 'Unwatch';
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        putWatchFetch(email, isWatch).then(() => window.dispatchEvent(new HashChangeEvent('hashchange')));
    })
    mainDiv.appendChild(btn);
    return mainDiv;
};