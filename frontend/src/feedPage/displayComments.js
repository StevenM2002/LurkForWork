import { linkedAccount } from "../accountPage/linkedAccount.js";
import { showComments } from "./showComments.js";

export const displayComments = (comments) => {
    const div = document.createElement('div');
    const btn = document.createElement('button');
    btn.innerText = 'Show Comments';
    const content = document.createElement('div');
    content.append(...comments.map(each => showComments(each)));
    
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (content.classList.contains('hidden')) {
            content.classList.remove('hidden');
        } else {
            content.classList.add('hidden');
        }
    });

    div.append(btn);
    div.append(content);
    return div;
}

