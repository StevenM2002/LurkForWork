import { linkedAccount } from "../accountPage/linkedAccount.js";
import { doFetch } from "../helpers.js";
import { modalComponent } from "../modalComponent.js/modalComponent.js";
import { addComment } from "./addComment.js";
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
    const createPostChild = (id) => {
        // Add all elements meant to be child to post
        const postChild = document.createElement('div');
        postChild.append(addComment(id));
        return postChild;
    }

    let numPostsLoaded = 0;
    const fetchFeed = () => {
        doFetch('/job/feed', undefined, 'GET', { 'start': numPostsLoaded }, window.localStorage.getItem('token'))
        .then(res => res.sort(((a, b) => a.createdAt < b.createdAt ? 1 : -1)))
        .then(res => res.map(ea => post(ea, createPostChild(ea.id))))
        .then(res => div.append(...res));
    }
    fetchFeed();
    // For infinite scroll
    document.addEventListener('scroll', () => {
        // documentElement scrollheight gets height of entire page, minus scrollY which is where the user is currently scrolled to. And if that is within the range of the viewport * 1.3 (as buffer space), then fetch the new content
        if (document.documentElement.scrollHeight - window.scrollY < window.innerHeight * 1.3) {
            numPostsLoaded += 5;
            fetchFeed();
        }
    });

    div.appendChild(header);
    return div;
};