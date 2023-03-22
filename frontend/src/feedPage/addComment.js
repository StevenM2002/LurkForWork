import { doFetch } from "../helpers.js";

export const addComment = (id) => {
    const addCommentDiv = document.createElement('div');
    const commentInput = document.createElement('input');
    const subBtn = document.createElement('button');

    commentInput.placeholder = 'Add a comment';
    subBtn.innerText = 'Post comment';

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
    addCommentDiv.append(commentInput, subBtn);
    return addCommentDiv;
}