export const addJobLink = () => {
    const link = document.createElement('a');

    link.classList.add('whiteBtn');
    link.href = '/#add';
    link.innerText = 'Add job';

    return link;
};