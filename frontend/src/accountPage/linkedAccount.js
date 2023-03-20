import { fetchUser } from "../helpers.js";

const default_pfp = '../../assets/default_pfp.svg';

export const linkedAccount = (id, isOnlyShowPfp=false) => {
    const div = document.createElement('div');
    const pfp = document.createElement('img');
    const linkedName = document.createElement('a');

    
    pfp.addEventListener('click', () => location.href = `/#account=${id}`);
    fetchUser(id).then(res => {
        if (!isOnlyShowPfp) {
            div.className = 'linkedaccount';
            linkedName.href = `/#account=${id}`;
            linkedName.innerText = res.name;
        } else {
            div.className = 'linkedaccount onlypfp';
        }
        pfp.src = res.image === undefined ? default_pfp : res.image;
        pfp.alt = 'clickable profile picture that navigates to their acount';
        
        div.append(linkedName, pfp);
    })
    return div;
};