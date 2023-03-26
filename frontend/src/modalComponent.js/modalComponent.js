export const modalComponent = (closeModalCallback, children=document.createElement('div')) => {
    // Create elements
    const modalDiv = document.createElement('div');
    const backgroundDiv = document.createElement('div');
    const closeBtn = document.createElement('button');

    // Add attributes
    backgroundDiv.classList.add('backgroundModal');
    modalDiv.classList.add('modal');
    closeBtn.classList.add('modalCloseBtn')
    closeBtn.classList.add('closeBtnBackground');

    // Event handler
    closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeModalCallback();
    });
    backgroundDiv.addEventListener('click', (e) => {
        if (e.target.classList.contains('backgroundModal')) {
            closeModalCallback()
        }
    });

    // Connect elements
    modalDiv.append(closeBtn, children);
    backgroundDiv.appendChild(modalDiv);
    return backgroundDiv;
};