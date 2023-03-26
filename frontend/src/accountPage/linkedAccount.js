import { fetchUser } from "../helpers.js";

const default_pfp = '../../assets/default_pfp.svg';

export const linkedAccount = (id) => {
    const div = document.createElement('div');
    const pfp = document.createElement('img');
    const linkedName = document.createElement('a');
    pfp.alt = 'clickable profile picture that navigates to their acount';
    pfp.className = 'profilePic';
    linkedName.className = 'inputLabel';
    div.className = 'linkedaccount';
    linkedName.href = `/#account=${id}`;

    const noNetworkFetch = () => {
        const profileCache = JSON.parse(localStorage.getItem('idprofile'));
        // If there is no cache
        if (profileCache === null || !(id in profileCache)) {
            linkedName.innerText = id;
            pfp.src = default_pfp;
        } else {
            // Get the cached name and image
            linkedName.innerText = profileCache[id].name;
            pfp.src = profileCache[id].image === undefined ? default_pfp : profileCache[id].image;
            div.append(pfp, linkedName);
        }
    }
    // do a no network fetch to buffer the lag in polling
    noNetworkFetch();
    pfp.addEventListener('click', () => location.href = `/#account=${id}`);
    fetchUser(id)
    .then(res => 'error' in res ? Promise.reject(res) : res)
    .then(res => {
        linkedName.innerText = res.name;
        pfp.src = res.image === undefined ? default_pfp : res.image;
        div.append(pfp, linkedName);
    })
    .catch(e => {
        if (e.error === 'No network detected') {
            noNetworkFetch();
        } else {
            alert(e.error);
        }
    });
    return div;
};