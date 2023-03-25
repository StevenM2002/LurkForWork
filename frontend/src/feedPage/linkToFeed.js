export const linkToFeed = () => {
    const link = document.createElement('a');
    link.href = '/#feed';
    link.classList.add('whiteBtn');
    link.innerText = 'Go to Feed';
    return link;
}