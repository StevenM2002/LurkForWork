import { linkedAccount } from "../accountPage/linkedAccount.js";
import { linkToFeed } from "../feedPage/linkToFeed.js";
import { doFetch, fileToDataUrl } from "../helpers.js";
import { logoutButton } from "../loginPage/logoutButton.js";

export const addJobPage = () => {
    // Create elements
    const pageDiv = document.createElement('div');
    const form = document.createElement('form');
    const subbtn = document.createElement('button');
    const header = document.createElement('header');

    // For input data
    let data = {};
    const createInput = (name, labelText, type='text') => {
        const div = document.createElement('div');
        const input = document.createElement('input');
        const label = document.createElement('label');

        input.placeholder = name;
        input.name = name;
        input.type = type;
        label.for = name;
        label.innerText = labelText;

        // Add to data when changed
        input.addEventListener('change', (e) => {
            e.preventDefault();
            if (type === 'file') {
                data[name] = input.files[0];
            } else {
                data[name] = input.value;
            }
        });

        div.append(label, input);
        return div;
    };
    
    const title = createInput('title', 'Enter title: ');
    const image = createInput('image', 'Enter job image: ', 'file');
    const start = createInput('start', 'Enter start date: ', 'date');
    const description = createInput('description', 'Enter job description: ');
    
    // Add attributes and events
    form.classList.add('formLayout');
    title.classList.add('formElement');
    image.classList.add('formElement');
    start.classList.add('formElement');
    description.classList.add('formElement');
    subbtn.type = 'submit';
    subbtn.innerText = 'Add New Job';
    subbtn.classList.add('blueBtn');

    subbtn.addEventListener('click', (e) => {
        e.preventDefault();
        let imgDataPromise;
        // Reset form if needed
        const resetForm = () => {
            form.reset();
            data = {};
            imgDataPromise = undefined;
        };
        try {
            data.start = new Date(data.start).toISOString();
        } catch {
            alert('Invalid start date');
            return;
        }
        try {
            // Assign promise here to seperate exceptions
            imgDataPromise = fileToDataUrl(data.image);
        } catch {
            alert('Invalid image');
            return
        }
        if (imgDataPromise !== undefined) {
            imgDataPromise.then(res => data.image = res)
            .then(() => doFetch('/job', data, 'POST', null, localStorage.getItem('token')).then((postRes => {
                if (postRes.error !== undefined) {
                    alert(postRes.error);
                }
            })))
            .then(() => resetForm());
        }
    });

    // Connect elements
    form.append(title, image, start, description, subbtn);
    header.append(linkedAccount(localStorage.getItem('userId')), linkToFeed());
    pageDiv.append(header, form);
    return pageDiv;
};