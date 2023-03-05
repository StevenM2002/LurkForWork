export const loginPage = () => {
    // Create elems
    const div = document.createElement('div');
    const form = document.createElement('form');
    const emailInput = document.createElement('input');
    const passInput = document.createElement('input');
    const subBtn = document.createElement('button');
    
    // Add attributes
    div.id = 'loginpage';
    emailInput.type = 'text';
    emailInput.placeholder = 'email'
    passInput.type = 'password';
    passInput.placeholder = 'password';
    subBtn.type = 'submit';
    subBtn.innerText = 'Login now!';

    // Add event handlers
    const onSubmit = (e) => {
        e.preventDefault();
        console.log('Hi am here');
    };
    subBtn.addEventListener('click', onSubmit);
    
    // Connect nodes
    form.append(emailInput, passInput, subBtn);
    div.appendChild(form);
    
    return(div);
};