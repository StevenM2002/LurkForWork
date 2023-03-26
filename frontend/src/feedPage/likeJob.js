import { doFetch } from "../helpers.js";

export const likeJob = (id, turnon) => {
    // Create elements
    const likeDiv = document.createElement('div');
    const likeBtn = document.createElement('button');

    // Add attributes
    if (turnon) {
        likeBtn.innerText = 'Like';
        likeBtn.classList.add('likeBtn');
    } else {
        likeBtn.innerText = 'Unlike';
        likeBtn.classList.add('unlikeBtn');
    }

    // Event handler
    likeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        doFetch('/job/like', {id, turnon: turnon}, 'PUT', null, localStorage.getItem('token'))
        .then(res => {
            if ('error' in res) {
                alert(res.error);
            }
        });
    });

    // Connect elements
    likeDiv.append(likeBtn);
    return likeDiv;
};