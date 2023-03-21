import { doFetch } from "../helpers.js";

export const likes = ({ id, userName }) => {
    // Create elems
    const likeBtn = document.createElement('button');

    // Add attr
    likeBtn.innerText = 'Like';

    // Add event handlers
    likeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        doFetch('/job/like', {id, isWatch}, 'PUT', null, localStorage.getItem('token'))
        .then(res => {
            if ('error' in res) {
                alert(res.error);
            } else {
                likes.append(userName);
            }
        });
    });
    
    return likeBtn;
};