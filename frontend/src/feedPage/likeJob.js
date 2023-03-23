import { doFetch } from "../helpers.js";

export const likeJob = (id, turnon) => {
    const likeDiv = document.createElement('div');
    const likeBtn = document.createElement('button');
    if (turnon) {
        likeBtn.innerText = 'Like';
        likeBtn.className = 'likeBtn';
    } else {
        likeBtn.innerText = 'Unlike';
        likeBtn.className = 'unlikeBtn';
    }

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