import { linkedAccount } from "../accountPage/linkedAccount.js";

export const showComments = ( {userId, comment} ) => {
    const div = document.createElement('div');
    div.classList.add('commentItem');
    const displayComment = document.createElement('p');

    displayComment.innerText = comment;
    
    div.append(linkedAccount(userId), displayComment);
    return div;
};