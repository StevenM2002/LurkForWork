import { putWatchFetch } from "../helpers.js";

export const watchAccByEmail = () => {
    const outerDiv = document.createElement('div');
    const form = document.createElement('form');
    const label = document.createElement('label');
    const input = document.createElement('input');
    const btn = document.createElement('button');

    label.for = 'watchAccByEmail';
    label.innerText = 'Watch person: ';
    input.placeholder = 'Their email';
    input.name = 'watchAccByEmail';
    btn.type = 'submit';
    btn.innerText = 'Watch user';
    form.className = 'centre-form';

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        putWatchFetch(input.value)
        .then(res => {
            if (res.error === undefined) {
                window.dispatchEvent(new HashChangeEvent('hashchange'));
            } else {
                alert(res.error);
            }
        });
    });

    form.append(label, input, btn);
    outerDiv.append(form);

    return outerDiv;
};