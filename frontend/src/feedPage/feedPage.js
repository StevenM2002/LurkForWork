import { linkedAccount } from "../accountPage/linkedAccount.js";
import { doFetch } from "../helpers.js";
import { modalComponent } from "../modalComponent.js/modalComponent.js";
import { post } from "./post.js";
import { watchAccByEmail } from "./watchAccByEmail.js";

export const feedPage = () => {
    // Create elems
    const div = document.createElement('div');
    const header = document.createElement('header');
    const showModalBtn = document.createElement('button');
    
    // Modal stuff below
    showModalBtn.innerText = 'Watch a user';
    let isModalVisible = false;
    const modalCallback = () => {
        isModalVisible = false;
        if (!modal.classList.contains('hidden')) {
            modal.classList.add('hidden');
        }
    };
    const modal = modalComponent(modalCallback, watchAccByEmail());
    modal.classList.add('hidden');
    showModalBtn.addEventListener('click', (e) => {
        e.preventDefault();
        isModalVisible = true;
        if (modal.classList.contains('hidden')) {
            modal.classList.remove('hidden');
        }
    });
    div.append(modal);


    // Add attr
    div.id = 'feedpage';
    header.append(linkedAccount(window.localStorage.getItem('userId')), showModalBtn);
    // Add elems
    doFetch('/job/feed', undefined, 'GET', { 'start': 0 }, window.localStorage.getItem('token'))
    .then(res => res.sort(((a, b) => a.createdAt < b.createdAt ? 1 : -1)))
    .then(res => res.map(ea => post(ea)))
    .then(res => div.append(...res));

    div.appendChild(header);
    return div;
};