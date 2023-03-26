export const logoutButton = () => {
    const btn = document.createElement('button');
    btn.innerText = 'Logout';
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.clear();
        location.href = '/#login';
    });
    return btn;
};