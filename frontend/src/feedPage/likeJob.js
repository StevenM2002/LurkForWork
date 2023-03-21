import { doFetch } from "../helpers.js";

export const likeJob = (id, turnon) => {
    const likeDiv = document.createElement('div');
    const likeBtn = document.createElement('button');
    likeBtn.innerText = turnon ? 'Like' : 'Unlike';

    likeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        doFetch('/job/like', {id, turnon: turnon}, 'PUT', null, localStorage.getItem('token'))
        .then(res => {
            if ('error' in res) {
                alert(res.error);
            }
        });
    });
    likeDiv.append(likeBtn);
    return likeDiv;
};