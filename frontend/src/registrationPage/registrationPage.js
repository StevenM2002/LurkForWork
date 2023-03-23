import { doFetch } from "../helpers.js";

export const registrationPage = () => {
    // Create elems
    const body = document.createElement('body')
    const div = document.createElement('div');
    const nameDiv = document.createElement('div');
    const nameLabel = document.createElement('label');
    const nameInput = document.createElement('input');
    const emailDiv = document.createElement('div');
    const emailLabel = document.createElement('label');
    const emailInput = document.createElement('input');
    const passDiv = document.createElement('div');
    const passLabel = document.createElement('label');
    const passInput = document.createElement('input');
    const confPassDiv = document.createElement('div');
    const confPassLabel = document.createElement('label');
    const confPassInput = document.createElement('input');
    const subBtn = document.createElement('button');
    const form = document.createElement('form');
    const title = document.createElement('h1');
    // const errMsg = document.createElement('h2');
    const toLogin = document.createElement('a');

    // Add attr
    body.className = 'background';
    nameDiv.className = 'inputDiv';
    nameLabel.innerText = 'Name';
    nameLabel.className = 'inputLabel';
    nameInput.placeholder = 'Enter name';
    emailDiv.className = 'inputDiv';
    emailLabel.innerText = 'Email Address';
    emailLabel.className = 'inputLabel';
    emailInput.placeholder = 'Example@email.com';
    passDiv.className = 'inputDiv';
    passLabel.innerText = 'Password';
    passLabel.className = 'inputLabel';
    passInput.type = 'password';
    passInput.placeholder = 'Enter password';
    confPassDiv.className = 'inputDiv';
    confPassLabel.innerText = 'Confirm Password';
    confPassLabel.className = 'inputLabel';
    confPassInput.type = 'password';
    confPassInput.placeholder = 'Confirm password';
    subBtn.type = 'submit';
    subBtn.textContent = 'Sign up!';
    subBtn.className = 'subBtn';
    div.id = 'registrationpage';
    form.className = 'centre-form';
    title.innerText = 'Register to LurkForWork!';
    toLogin.href = '/#login';
    toLogin.innerText = 'Login here!';
    toLogin.className = 'linkBtn';

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
    nameDiv.append(nameLabel, nameInput);
    emailDiv.append(emailLabel, emailInput);
    passDiv.append(passLabel, passInput);
    confPassDiv.append(confPassLabel, confPassInput);
    form.append(nameDiv, emailDiv, passDiv, confPassDiv, subBtn, toLogin);
    div.append(title, form); /* removed errMdg from here */
    body.append(div);
    return body;
};
