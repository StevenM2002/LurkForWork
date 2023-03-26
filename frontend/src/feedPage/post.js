// Who made by
// When posted
// Job content
    // Image
    // Job title
    // Starting data
    // How many likes
    // Button to hide/show the users who liked
    // Users who liked
    // Job description
    // Job comments

import { linkedAccount } from "../accountPage/linkedAccount.js";
import { likeJob } from "./likeJob.js";
import { fetchUser } from "../helpers.js";

export const post = ( { id, creatorId, createdAt, image, title, start, likes, description, comments }, children=undefined ) => {
    // Create elems
    const div = document.createElement('div');
    const accountDiv = document.createElement('div');
    const name = linkedAccount(creatorId);
    const postedTime = document.createElement('b');
    const imageJob = document.createElement('img');
    const titleJob = document.createElement('h2');
    const dateStart = document.createElement('b');
    const jobDescTitle = document.createElement('h3');
    const descJob = document.createElement('p');
    const statsDiv = document.createElement('div');
    const likesNum = document.createElement('b');
    const commentsNum = document.createElement('b');

    // Time posted
    const delta = new Date() - new Date(createdAt);
    const deltaStr = `${Math.floor(delta / 3600000) === 0 ? '' : Math.floor(delta / 3600000) + ' hours'} ${Math.floor((delta % 3600000) / 60000)} minutes ago`
    // fetchUser(creatorId).then(res => res.name).then(res => name.innerText = `Posted by: ${res}`);

    // Add attributes
    div.classList.add('post');
    div.id = id;
    accountDiv.classList.add('postAccountDiv');
    accountDiv.append(name);
    postedTime.innerText = `Posted on: ${delta > 86400000 ? new Date(createdAt).toDateString() : deltaStr}`;
    imageJob.alt = 'Picture description of job';
    imageJob.src = image;
    imageJob.classList.add('imgJob');
    titleJob.innerText = title;
    dateStart.innerText = `Starting on: ${new Date(start).toDateString()}`;
    dateStart.classList.add('dateStyle');
    jobDescTitle.innerText = 'Job Description'; 
    descJob.innerText = description;
    statsDiv.classList.add('divHorizontal');
    statsDiv.classList.add('statsDiv');
    likesNum.innerText = `${likes.length} likes`;
    commentsNum.innerText = `${comments.length} comments`;
    statsDiv.append(likesNum, commentsNum);

    // Connect elements
    div.append(accountDiv, postedTime, titleJob, dateStart, imageJob, jobDescTitle, descJob, statsDiv);
    if (children !== undefined) {
        div.appendChild(children);
    }
    return div;
};