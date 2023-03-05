export const loginPage = () => {
    // Create elems
    const div = document.createElement('div');
    const form = document.createElement('form');
    const emailInput = document.createElement('input');
    const passInput = document.createElement('input');
    const subBtn = document.createElement('button');
    const title = document.createElement('h1');
    
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

    // Add event handlers
    const onSubmit = (e) => {
        e.preventDefault();
        console.log('Hi am here');
    };
    subBtn.addEventListener('click', onSubmit);
    
    // Connect nodes
    form.append(emailInput, passInput, subBtn);
    div.append(title, form);

    return(div);
};