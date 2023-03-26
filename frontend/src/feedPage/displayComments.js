import { linkedAccount } from "../accountPage/linkedAccount.js";
import { showComments } from "./showComments.js";

export const displayComments = (comments) => {
    // Create elements
    const div = document.createElement('div');
    const btn = document.createElement('button');
    const content = document.createElement('div');

    // Add attributes
    div.classList.add('commentLayout');
    btn.innerText = 'Show Comments';
    btn.classList.add('whiteBtn');
    content.classList.add('hidden');
    content.append(...comments.map(each => showComments(each)));
    
    // Event handlers
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (content.classList.contains('hidden')) {
            content.classList.remove('hidden');
            btn.innerText = 'Hide Comments';
            
        } else {
            content.classList.add('hidden');
            btn.innerText = 'Show Comments';
        }
    });

    // Connect elements
    div.append(btn);
    div.append(content);
    return div;
}

