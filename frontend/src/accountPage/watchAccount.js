import { putWatchFetch } from "../helpers.js";

export const watchAccount = (email, isWatch=true) => {
    // Create elements
    const mainDiv = document.createElement('div');
    const btn = document.createElement('button');

    // Add attributes
    if (isWatch) {
        btn.innerText = 'Watch';
        btn.classList.add('subBtn');
    } else {
        btn.innerText = 'Unwatch';
        btn.classList.add('whiteBtn');
    }

    // Event handlers
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        putWatchFetch(email, isWatch).then(() => window.dispatchEvent(new HashChangeEvent('hashchange')));
    })

    // Connect elements
    mainDiv.appendChild(btn);
    return mainDiv;
};