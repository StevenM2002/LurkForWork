import { doFetch, fileToDataUrl } from "../helpers.js";

export const updateJob = (id) => {
    // Create elements
    const mainDiv = document.createElement('div');
    const form = document.createElement('form');
    const subBtn = document.createElement('button');

    let data = {};
    const createInput = (name, labelText, type='text') => {
        const outerDiv = document.createElement('div');
        const innerDiv = document.createElement('div');
        const input = document.createElement('input');
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        const checkboxLabel = document.createElement('label');
        
        // Add attr
        checkbox.type = 'checkbox';
        checkbox.name = `${name}checkboxjob`;
        checkboxLabel.for = `${name}checkboxjob`;
        checkboxLabel.innerText = `Edit ${name}: `;
        input.name = name;
        input.type = type;
        input.placeholder = name;
        label.for = name;
        label.innerText = labelText;
        innerDiv.append(label, input);
        innerDiv.classList.add('hidden');

        // Add events
        input.addEventListener('change', (e) => {
            e.preventDefault();
            if (type === 'file') {
                data[name] = input.files[0];
            } else {
                data[name] = input.value;
            }
        });
        checkbox.addEventListener('click', (e) => {
            if (checkbox.checked) {
                innerDiv.classList.remove('hidden');
                if (type === 'file') {
                    data[name] = input.files[0];
                } else {
                    data[name] = input.value;
                }
            } else {
                innerDiv.classList.add('hidden');
                delete data[name];
            }
        });
        outerDiv.append(checkboxLabel, checkbox, innerDiv);
        return outerDiv;
    };

    // Creating elements for the form
    const title = createInput('title', 'Enter title: ');
    const image = createInput('image', 'Enter job image: ', 'file');
    const start = createInput('start', 'Enter starting date: ', 'date');
    const description = createInput('description', 'Enter job description: ');
    subBtn.innerText = 'Save';

    subBtn.addEventListener('click', (e) => {
        e.preventDefault();
        let imageData = Promise.resolve(undefined);
        // If statements below to seperate out exeptions
        if ('date' in data) {
            try {
                data.date = new Date(data.date).toISOString();
            } catch {
                alert('Invalid date');
                return;
            }
        }
        // Check what to save in data
        if ('image' in data) {
            try {
                imageData = fileToDataUrl(data.image);
            } catch (e) {
                imageData = Promise.resolve(undefined);
                alert('Invalid image');
                return;
            }
        }
        imageData
        .then(imgRes => data.image = imgRes)
        .then(() => {
            if (data.image === undefined) {
                delete data.image;
            }
            doFetch('/job', {...data, id}, 'PUT', null, localStorage.getItem('token'))
            .then(res => {
                if (res.error !== undefined) {
                    alert(res.error);
                } else {
                    window.dispatchEvent(new HashChangeEvent('hashchange'));
                }
            });
        }); 
    });

    form.append(title, image, start, description, subBtn);
    mainDiv.append(form);

    // Callback for modal to use
    const cancelCallback = () => {
        data = {};
        form.reset();
        [title, image, start, description]
        .map(ea => ea.getElementsByTagName('div'))
        .forEach(ea => ea[0].classList.add('hidden'));
    }

    return [mainDiv, cancelCallback];
};