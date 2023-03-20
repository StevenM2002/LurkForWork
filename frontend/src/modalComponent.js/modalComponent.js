export const modalComponent = (closeModalCallback, children=document.createElement('div')) => {
    const modalDiv = document.createElement('div');
    const backgroundDiv = document.createElement('div');
    const closeBtn = document.createElement('button');

    backgroundDiv.className = 'background-modal';
    modalDiv.className = 'modal';
    closeBtn.className = 'modal-circle-btn red-x-background';
    
    closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeModalCallback();
    });
    backgroundDiv.addEventListener('click', (e) => {
        if (e.target.classList.contains('background-modal')) {
            closeModalCallback()
        }
    });

    modalDiv.append(closeBtn, children);
    backgroundDiv.appendChild(modalDiv);
    return backgroundDiv;
};