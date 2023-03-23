export const linkToFeed = () => {
    const link = document.createElement('a');
    link.href = '/#feed';
    link.innerText = 'Go to feed';
    return link;
}