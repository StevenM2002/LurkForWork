import { doFetch } from "../helpers.js";

export const registrationPage = () => {
    // Create elems
    const div = document.createElement('div');
    const emailInput = document.createElement('input');
    const nameInput = document.createElement('input');
    const passInput = document.createElement('input');
    const confPassInput = document.createElement('input');
    const subBtn = document.createElement('button');
    const form = document.createElement('form');
    const title = document.createElement('h1');
    const errMsg = document.createElement('h2');
    const toLogin = document.createElement('a');

    // Add attr
    emailInput.placeholder = 'email';
    nameInput.placeholder = 'name';
    passInput.type = 'password';
    passInput.placeholder = 'password';
    confPassInput.type = 'password';
    confPassInput.placeholder = 'confirm password';
    subBtn.type = 'submit';
    subBtn.textContent = 'Sign up!';
    div.id = 'registrationpage';
    form.className = 'centre-form';
    title.innerText = 'Register to LurkForWork!';
    toLogin.href = '/#login';
    toLogin.innerText = 'Login here!';

    // Add event handlers
    subBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (passInput.value !== confPassInput.value) {
            alert('Passwords do not match');
            return;
        }
        doFetch('/auth/register', {'email': emailInput.value, 'password': passInput.value, 'name': nameInput.value}, 'POST')
        .then(res => {
            if (res.error === undefined) {
                window.localStorage.setItem('token', res.token);
                window.localStorage.setItem('userId', res.userId);
                location.href = '/#feed';
            } else {
                alert(res.error);
            }
        });
    })
    
    
    // Connect nodes
    form.append(nameInput, emailInput, passInput, confPassInput, subBtn, toLogin);
    div.append(title, errMsg, form);
    return div;
};