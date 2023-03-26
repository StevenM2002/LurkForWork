import { linkedAccount } from "../accountPage/linkedAccount.js";

export const showComments = ( {userId, comment} ) => {
    const div = document.createElement('div');
    div.classList.add('comment-item');
    const displayComment = document.createElement('p');

    displayComment.innerText = comment;
    
    div.append(linkedAccount(userId), displayComment);
    return div;
};