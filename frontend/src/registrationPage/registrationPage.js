import { doFetch } from "../helpers.js";

export const registrationPage = () => {
    // Create elems
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
    const toLogin = document.createElement('a');

    // Add attr
    document.body.classList.add('background');
    nameDiv.classList.add('inputDiv');
    nameLabel.innerText = 'Name';
    nameLabel.classList.add('inputLabel');
    nameInput.placeholder = 'Enter name';
    emailDiv.classList.add('inputDiv');
    emailLabel.innerText = 'Email Address';
    emailLabel.classList.add('inputLabel');
    emailInput.placeholder = 'Example@email.com';
    passDiv.classList.add('inputDiv');
    passLabel.innerText = 'Password';
    passLabel.classList.add('inputLabel');
    passInput.type = 'password';
    passInput.placeholder = 'Enter password';
    confPassDiv.classList.add('inputDiv');
    confPassLabel.innerText = 'Confirm Password';
    confPassLabel.classList.add('inputLabel');
    confPassInput.type = 'password';
    confPassInput.placeholder = 'Confirm password';
    subBtn.type = 'submit';
    subBtn.textContent = 'Sign up!';
    subBtn.classList.add('subBtn');
    div.id = 'registrationpage';
    form.classList.add('centre-form');
    title.innerText = 'Register to LurkForWork!';
    toLogin.href = '/#login';
    toLogin.innerText = 'Login here!';
    toLogin.classList.add('linkBtn');

    // Add event handlers
    subBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (nameInput.value.length == 0) {
            alert('Please enter a name');
            return;
        } else if (emailInput.value.length == 0) {
            alert('Please enter an email address');
            return;
        } else if (passInput.value.length == 0) {
            alert('Please enter a password');
            return;
        } else if (passInput.value !== confPassInput.value) {
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
    div.append(title, form); 
    return div;
};
