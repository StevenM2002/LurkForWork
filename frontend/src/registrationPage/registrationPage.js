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

    // Add event handlers
    const isPassOk = () => {
        return(
            passInput.value === confPassInput.value
            && passInput !== ''
        );
    };
    
    
    // Connect nodes
    form.append(nameInput, emailInput, passInput, confPassInput, subBtn);
    div.append(title, errMsg, form);
    return div;
};