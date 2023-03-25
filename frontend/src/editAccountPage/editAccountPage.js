import { linkedAccount } from "../accountPage/linkedAccount.js";
import { linkToFeed } from "../feedPage/linkToFeed.js";
import { doFetch, fetchUser, fileToDataUrl } from "../helpers.js";
import { logoutButton } from "../loginPage/logoutButton.js";

export const editAccountPage = () => {
    const pageDiv = document.createElement('div');
    const form = document.createElement('form');
    const submitBtn = document.createElement('button');
    const cancelBtn = document.createElement('button');

    submitBtn.innerText = 'Save changes';
    submitBtn.type = 'submit';
    cancelBtn.innerText = 'Cancel';

    let dataToSend = {};
    // Cant be bothered to give ids and do it by selecting so have pointers to elems instead
    const refToInputDivs = [];
    const makeNewInput = (name, labelText, type='text') => {
        const div = document.createElement('div');
        const checkbox = document.createElement('input');
        const checkboxLabel = document.createElement('label');
        const label = document.createElement('label');
        const input = document.createElement('input');
        const inputDiv = document.createElement('div');
        
        checkbox.type = 'checkbox';
        checkbox.name = `${name}checkbox`;
        checkboxLabel.innerText = `Modify ${labelText}`;
        checkboxLabel.for = `${name}checkbox`;
        label.innerText = labelText;
        label.for = name;
        input.name = name;
        input.placeholder = `Add new ${name}`;
        input.type = type;

        inputDiv.append(label, input);
        inputDiv.className = 'hidden';

        refToInputDivs.push(inputDiv);

        input.addEventListener('change', (e) => {
            e.preventDefault();
            if (name in dataToSend) {
                if (name !== 'image') {
                    dataToSend[name] = input.value;
                } else {
                    dataToSend[name] = input.files[0];
                }
            }
        })

        checkbox.addEventListener('change', (e) => {
            e.preventDefault();
            if (checkbox.checked) {
                inputDiv.className = '';
                if (name !== 'image') {
                    dataToSend[name] = input.value;
                } else {
                    dataToSend[name] = input.files[0];
                }
            } else {
                inputDiv.className = 'hidden';
                delete dataToSend[name];
            }
        });
        
        div.append(checkboxLabel, checkbox, inputDiv);
        return div;
    };
    const name = makeNewInput('name', 'Name: ');
    const email = makeNewInput('email', 'Email: ')
    const pfp = makeNewInput('image', 'Profile Pic: ', 'file');
    const pass = makeNewInput('password', 'Password: ', 'password');
    
    cancelBtn.addEventListener('click', (e) => {
        e.preventDefault();
        form.reset();
        refToInputDivs.forEach((ea) => ea.className = 'hidden');
        dataToSend = {};
    });
    
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const submitFetch = () => {
            doFetch('/user', dataToSend, 'PUT', null, localStorage.getItem('token'))
            .then(res => {
                if (res.error !== undefined) {
                    alert(res.error);
                }
            });
        };
        if ('image' in dataToSend) {
            try {
                fileToDataUrl(dataToSend.image)
                .then(res => dataToSend.image = res)
                .then(() => submitFetch());
            } catch (e) {
                alert(e);
                return;
            }
        } else {
            submitFetch();
        }
        alert('Updated!');
        cancelBtn.dispatchEvent(new Event('click'));
    });

    // Connect elems
    form.append(name, email, pfp, pass, cancelBtn, submitBtn);
    const header = document.createElement('header');
    header.append(linkedAccount(localStorage.getItem('userId')), linkToFeed());
    pageDiv.append(header, form);

    return pageDiv;
};