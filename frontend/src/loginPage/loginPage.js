import { doFetch } from "../helpers.js";

export const loginPage = () => {
    // Create elems
    const div = document.createElement('div');
    const form = document.createElement('form');
    const emailInput = document.createElement('input');
    const passInput = document.createElement('input');
    const subBtn = document.createElement('button');
    const title = document.createElement('h1');
    const errMsg = document.createElement('h2');

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
    errMsg.className = 'err-msg';

    // Add event handlers
    const onSubmit = (e) => {
        e.preventDefault();
        doFetch('/auth/login', { 'email': emailInput.value, 'password': passInput.value }, 'POST')
        .then(res => {
            if (res.error !== undefined) {
                errMsg.innerText = res.error;
            } else {
                errMsg.innerText = '';
            }
            return res;
        })
        .then(res => console.log(res));
        passInput.value = '';
    };
    subBtn.addEventListener('click', onSubmit);

    // Connect nodes
    form.append(emailInput, passInput, subBtn);
    div.append(title, errMsg, form);

    return (div);
};