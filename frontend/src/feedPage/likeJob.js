import { doFetch } from "../helpers.js";

export const likes = ({ id }) => {
    const likeBtn = document.createElement('button');
    likeBtn.innerText = 'Like';

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