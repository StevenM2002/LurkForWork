import { putWatchFetch } from "../helpers.js";

export const watchAccount = (email, isWatch=true) => {
    const mainDiv = document.createElement('div');
    const btn = document.createElement('button');
    if (isWatch) {
        btn.innerText = 'Watch';
        btn.classList.add('subBtn');
    } else {
        btn.innerText = 'Unwatch';
        btn.classList.add('whiteBtn');
    }

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        putWatchFetch(email, isWatch).then(() => window.dispatchEvent(new HashChangeEvent('hashchange')));
    })
    mainDiv.appendChild(btn);
    return mainDiv;
};