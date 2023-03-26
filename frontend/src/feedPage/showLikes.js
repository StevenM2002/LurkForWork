import { modalComponent } from "../modalComponent.js/modalComponent.js";

export const showLikes = (usernames) => {
    // Create elements
    const showLikesDiv = document.createElement('div');
    const showLikesModal = document.createElement('button');
    const noLikesMsg = document.createElement('p');

    // Add attributes
    noLikesMsg.innerText = 'There are no likes'
    showLikesModal.innerText = 'Show Likes';
    showLikesModal.classList.add('whiteBtn');
    const list = document.createElement('ul');

    // Display users in a modal
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
    const modal = modalComponent(modalCallback, usernames.length !== 0 ? list : noLikesMsg);
    modal.classList.add('hidden');
    showLikesModal.addEventListener('click', (e) => {
        e.preventDefault();
        isModalVisible = true;
        if (modal.classList.contains('hidden')) {
            modal.classList.remove('hidden');
        }
    });

    // Connect elements
    showLikesDiv.append(modal, showLikesModal);
    return showLikesDiv;
};

