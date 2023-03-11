import { changeRoute, doFetch } from "../helpers.js";

export const loginPage = () => {
    // Create elems
    const div = document.createElement('div');
    const form = document.createElement('form');
    const emailInput = document.createElement('input');
    const passInput = document.createElement('input');
    const subBtn = document.createElement('button');
    const title = document.createElement('h1');
    const toRegi = document.createElement('a');

    // Add attributes
    div.id = 'loginpage';
    title.innerText = 'Login to Lurk for work!';
    emailInput.type = 'text';
    emailInput.placeholder = 'email'
    passInput.type = 'password';
    passInput.placeholder = 'password';
    subBtn.type = 'submit';
    subBtn.innerText = 'Login now!';
    form.className = 'centre-form';
    toRegi.href = '/#register';
    toRegi.innerText = 'Register here!';

    // Add event handlers
    const onSubmit = (e) => {
        e.preventDefault();
        doFetch('/auth/login', { 'email': emailInput.value, 'password': passInput.value }, 'POST')
        .then(res => {
            if (res.error === undefined) {
                window.localStorage.setItem('token', res.token);
                window.localStorage.setItem('userId', res.userId);
                location.href = '/#feed';
            } else {
                alert(res.error);
            }
        });
        passInput.value = '';
    };
    subBtn.addEventListener('click', onSubmit);

    // Connect nodes
    form.append(emailInput, passInput, subBtn, toRegi);
    div.append(title, form);

    return (div);
};