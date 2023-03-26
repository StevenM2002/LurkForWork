import { doFetch } from "../helpers.js";

export const addComment = (id) => {
    // Create elements
    const addCommentDiv = document.createElement('div');
    const commentInput = document.createElement('input');

    // Add attributes
    commentInput.className = 'commentInput';
    const subBtn = document.createElement('button');
    commentInput.placeholder = 'Add a comment';
    subBtn.innerText = 'Post Comment';
    subBtn.className = 'blueBtn';

    // Event handlers
    subBtn.addEventListener('click', (e) => {
        e.preventDefault();
        doFetch('/job/comment', {id, comment: commentInput.value}, 'POST', null, localStorage.getItem('token'))
        .then(res => {
            if ('error' in res) {
                alert(res.error);
            }
        });
        commentInput.value = '';
    });

    // Connect elements
    addCommentDiv.append(commentInput, subBtn);
    return addCommentDiv;
}