export const notFoundPage = () => {
    // Create elems
    const pageDiv = document.createElement('div');
    const loginA = document.createElement('a');
    const registerA = document.createElement('a');
    const title = document.createElement('h1');

    //Add attr
    pageDiv.id = 'notfoundpage';
    loginA.href = '/#login';
    loginA.innerText = 'Login here';
    registerA.href = '/#register';
    registerA.innerText = 'Register here';
    title.innerText = 'This route is non-existant';

    // Connect elems
    pageDiv.append(title, loginA, registerA);
    return pageDiv;
};