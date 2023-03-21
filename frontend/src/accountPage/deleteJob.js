import { doFetch } from "../helpers.js";

export const deleteJob = (id) => {
    // Only button and no div coz why not my add parent div later for css purpose
    const deleteJobBtn = document.createElement('button');

    deleteJobBtn.innerText = 'Delete';

    deleteJobBtn.addEventListener('click', (e) => {
        e.preventDefault();
        doFetch('/job', {id}, 'DELETE', null, localStorage.getItem('token'))
        .then(res => {
            if ('error' in res) {
                alert(res.error);
            } else {
                window.dispatchEvent(new HashChangeEvent('hashchange'));
            }
        });
    });

    return deleteJobBtn;
}