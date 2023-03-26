import { doFetch } from "../helpers.js";

export const deleteJob = (id) => {
    // Create only button and no div for reusability
    const deleteJobBtn = document.createElement('button');

    // Add attributes
    deleteJobBtn.classList.add('redBtn');
    deleteJobBtn.innerText = 'Delete';

    // Event handlers
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
};
