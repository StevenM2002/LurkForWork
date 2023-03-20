export const accountNotFound = () => {
    const div = document.createElement('div');
    const title = document.createElement('h1');

    title.textContent = 'Account not found';

    div.append(title);
    return div;
};