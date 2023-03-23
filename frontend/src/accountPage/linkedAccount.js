import { fetchUser } from "../helpers.js";

const default_pfp = '../../assets/default_pfp.svg';

export const linkedAccount = (id, name=undefined, profileImage=undefined) => {
    const div = document.createElement('div');
    const pfp = document.createElement('img');
    const linkedName = document.createElement('a');
    pfp.alt = 'clickable profile picture that navigates to their acount';
    div.className = 'linkedaccount';
    linkedName.href = `/#account=${id}`;

    
    pfp.addEventListener('click', () => location.href = `/#account=${id}`);
    fetchUser(id)
    .then(res => 'error' in res ? Promise.reject(res) : res)
    .then(res => {
        linkedName.innerText = res.name;
        pfp.src = res.image === undefined ? default_pfp : res.image;
        div.append(linkedName, pfp);
    })
    .catch(e => {
        if (e.error === 'No network detected') {
            linkedName.innerText = name === undefined ? id.toString() : name;
        } else {
            alert(e.error);
        }
    });
    return div;
};