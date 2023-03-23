import { changeRoute, doFetch } from "../helpers.js";

export const loginPage = () => {
    // Create elems
    const body = document.createElement('body')
    const div = document.createElement('div');
    const form = document.createElement('form');
    const emailDiv = document.createElement('div');
    const emailLabel = document.createElement('label');
    const emailInput = document.createElement('input');
    const passDiv = document.createElement('div');
    const passLabel = document.createElement('label');
    const passInput = document.createElement('input');
    const subBtn = document.createElement('button');
    const title = document.createElement('h1');
    const toRegi = document.createElement('a');

    // Add attributes
    body.className = 'background';
    div.id = 'loginpage';
    title.innerText = 'Login to LurkForWork!';
    emailDiv.className = 'inputDiv';
    emailLabel.innerText = 'Email Address';
    emailLabel.className = 'inputLabel';
    emailInput.type = 'text';
    emailInput.placeholder = 'Example@email.com';
    emailInput.className = 'username';
    passDiv.className = 'inputDiv';
    passLabel.innerText = 'Password';
    passLabel.className = 'inputLabel';
    passInput.type = 'password';
    passInput.placeholder = 'Enter password';
    passInput.className = 'password';
    subBtn.type = 'submit';
    subBtn.innerText = 'Login now!';
    subBtn.className = 'subBtn';
    form.className = 'centre-form';
    toRegi.href = '/#register';
    toRegi.innerText = 'Register here!';
    toRegi.className = 'linkBtn';

    // Add event handlers
    const onSubmit = (e) => {
        e.preventDefault();
        if (emailInput.value.length == 0) {
            alert('Please enter an email address');
            return;
        } else if (passInput.value.length == 0) {
            alert('Please enter a password');
            return;
        }
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
    emailDiv.append(emailLabel, emailInput);
    passDiv.append(passLabel, passInput);
    form.append(emailDiv, passDiv, subBtn, toRegi);
    div.append(title, form);
    body.append(div);

    return (body);
};
