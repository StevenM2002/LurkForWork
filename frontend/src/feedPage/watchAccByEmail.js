import { putWatchFetch } from "../helpers.js";

export const watchAccByEmail = () => {
    // Create elements
    const outerDiv = document.createElement('div');
    const form = document.createElement('form');
    const label = document.createElement('label');
    const input = document.createElement('input');
    const btn = document.createElement('button');
    btn.classList.add('subBtn');

    // Create attributes
    label.for = 'watchAccByEmail';
    label.innerText = 'Watch a person';
    input.placeholder = 'Enter an email';
    input.name = 'watchAccByEmail';
    input.classList.add('commentInput');
    btn.type = 'submit';
    btn.innerText = 'Watch user';
    form.className = 'centreForm';

    // Event handler
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
    
    // Connect elements
    form.append(label, input, btn);
    outerDiv.append(form);

    return outerDiv;
};