import { linkedAccount } from "../accountPage/linkedAccount.js";

export const displayComments = () => {
    const div = document.createElement('div');
    const btn = document.createElement('button');
    btn.innerText = 'Show Comments';
    const content = document.createElement('div');
    
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (content.classList.contains('hidden')) {
            content.classList.display = flex;
        } else {
            content.classList.contains('hidden');
        }
    });

    div.append(btn);
    div.append(content);
    return div;
}