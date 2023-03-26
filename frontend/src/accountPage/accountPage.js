import { addJobLink } from "../addJobPage/addJobLink.js";
import { linkToFeed } from "../feedPage/linkToFeed.js";
import { post } from "../feedPage/post.js";
import { fetchUser } from "../helpers.js";
import { logoutButton } from "../loginPage/logoutButton.js";
import { modalComponent } from "../modalComponent.js/modalComponent.js";
import { accountNotFound } from "./accountNotFound.js";
import { deleteJob } from "./deleteJob.js";
import { linkedAccount } from "./linkedAccount.js";
import { updateJob } from "./updateJob.js";
import { watchAccount } from "./watchAccount.js";

const defaultPicture = '../../assets/default_pfp.svg';

export const accountPage = () => {
    // Get params
    const userId = location.hash.split('=')[1];
    if (userId === undefined) {
        return accountNotFound();
    }

    // Create elements
    const pageDiv = document.createElement('div');
    const email = document.createElement('p');
    const name = document.createElement('h2');
    const image = document.createElement('img');
    const jobsDiv = document.createElement('div');
    const watchedByDiv = document.createElement('div');
    const watchedByNum = document.createElement('p');
    const header = document.createElement('header');
    
    // Add attributes
    pageDiv.id = 'accountpage';
    header.classList.add('divHorizontal');
    watchedByDiv.classList.add('watchedByDiv');
    
    // Create update job modal
    const createUpdateJob = (id) => {
        const updateJobDiv = document.createElement('div');
        const editJobBtn = document.createElement('button');
        editJobBtn.innerText = 'Edit Job';
        editJobBtn.classList.add('subBtn');
        const [updateJobComponent, cancelUpdateCallback] = updateJob(id);
        const cancelModalCallback = () => {
            cancelUpdateCallback();
            editJobModal.classList.add('hidden');
        };
        const editJobModal = modalComponent(() => cancelModalCallback(), updateJobComponent);
        editJobModal.classList.add('hidden');
        editJobBtn.addEventListener('click', (e) => {
            e.preventDefault();
            editJobModal.classList.remove('hidden');
        });
        updateJobDiv.append(editJobBtn, editJobModal);
        return updateJobDiv;
    }

    // Create child to post
    const postChild = (id) => {
        const postChildDiv = document.createElement('div');
        postChildDiv.append(createUpdateJob(id), deleteJob(id));
        return postChildDiv;
    }

    const accountDiv = document.createElement('div');
    accountDiv.classList.add('grid-container');
    accountDiv.classList.add('accountDiv');

    // Add everything that has to wait for promise to resolve inside promise
    fetchUser(userId).then(res => {
        if (res === undefined || res.error !== undefined) {
            alert(res.error);
            pageDiv.appendChild(accountNotFound());
        } else {
            // Add watchers
            if (userId !== localStorage.getItem('userId')) {
                if (!res.watcheeUserIds.map((ea) => ea.toString()).includes(localStorage.getItem('userId'))) {
                    pageDiv.appendChild(watchAccount(res.email, true));
                } else {
                    pageDiv.appendChild(watchAccount(res.email, false));
                }
            }
            // Add all other details
            email.innerText = res.email;
            name.innerText = res.name;
            image.src = res.image === undefined ? defaultPicture : res.image;
            image.alt = 'Profile picture';
            watchedByNum.innerText = `Watched by ${res.watcheeUserIds.length} users`;
            
            // Connect elems
            watchedByDiv.appendChild(watchedByNum);
            watchedByDiv.append(...res.watcheeUserIds.map(ea => linkedAccount(ea)));
            jobsDiv.append(...res.jobs.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1).map(ea => post(ea, postChild(ea.id))));
            accountDiv.append(image, name, email, watchedByDiv);
            pageDiv.append(accountDiv, jobsDiv);
        }
    });

    // Add link to own profile if not visiting own profile
    if (userId !== localStorage.getItem('userId') && localStorage.getItem('userId') !== undefined) {
        header.appendChild(linkedAccount(localStorage.getItem('userId')));
    } 

    // Add edit functionality if it is own profile
    else {
        const toEdit = document.createElement('a');
        toEdit.href = '/#edit';
        toEdit.innerText = 'Edit profile';
        toEdit.classList.add('whiteBtn');
        header.appendChild(toEdit);
    }

    header.append(linkToFeed(), addJobLink(), logoutButton());
    pageDiv.appendChild(header);
    return pageDiv;
};
