import { modalComponent } from "../modalComponent.js/modalComponent.js";

export const showLikes = (usernames) => {
    const showLikesDiv = document.createElement('div');
    const showLikesModal = document.createElement('button');

    showLikesModal.innerText = 'Show Likes';

    const list = document.createElement('ul');
    const displayUsers = (name) => {
        const li = document.createElement('li');
        li.innerText = name;
        list.append(li);
    }
    let isModalVisible = false;
    const modalCallback = () => {
        isModalVisible = false;
        if (!modal.classList.contains('hidden')) {
            modal.classList.add('hidden');
        }
    };
    usernames.forEach(name => displayUsers(name));
    const modal = modalComponent(modalCallback, list);
    modal.classList.add('hidden');
    showLikesModal.addEventListener('click', (e) => {
        e.preventDefault();
        isModalVisible = true;
        if (modal.classList.contains('hidden')) {
            modal.classList.remove('hidden');
        }
    });
    showLikesDiv.append(modal, showLikesModal);
    return showLikesDiv;
};

