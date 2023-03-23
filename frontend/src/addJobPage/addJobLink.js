export const addJobLink = () => {
    const link = document.createElement('a');
    link.className = 'linkBtn';
    link.href = '/#add';
    link.innerText = 'Add job';
    return link;
};