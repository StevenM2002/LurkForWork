import { linkedAccount } from "../accountPage/linkedAccount.js";

export const showComments = ( {userId, comment} ) => {
    const showCommentsDiv = document.createElement('div');
    const displayComment = document.createElement('p');
    displayComment.innerText = comment;
    
    showCommentsDiv.append(linkedAccount(userId), displayComment);
    return showCommentsDiv;
};