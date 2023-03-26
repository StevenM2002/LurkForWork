export const logoutButton = () => {
    const btn = document.createElement('button');
    btn.innerText = 'Logout';
    btn.classList.add('redBtn');
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.clear();
        location.href = '/#login';
    });
    return btn;
};