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
    const name = linkedAccount(creatorId);
    const postedTime = document.createElement('b');
    const imageJob = document.createElement('img');
    const titleJob = document.createElement('h1');
    const dateStart = document.createElement('b');
    const likesNum = document.createElement('b');
    const jobDescTitle = document.createElement('h2');
    const descJob = document.createElement('p');
    const commentsNum = document.createElement('b');

    // TODO: NEED TO FIX
    const delta = new Date() - new Date(createdAt);
    const deltaStr = `${Math.floor(delta / 3600000) === 0 ? '' : Math.floor(delta / 3600000) + ' Hours'} ${Math.floor((delta % 3600000) / 60000)} Minutes ago`

    // Add attr
    div.className = 'post';
    div.id = id;
    // fetchUser(creatorId).then(res => res.name).then(res => name.innerText = `Posted by: ${res}`);
    postedTime.innerText = `Posted on: ${delta > 86400000 ? new Date(createdAt).toDateString() : deltaStr}`
    imageJob.alt = 'Picture description of job';
    imageJob.src = image;
    titleJob.innerText = title;
    dateStart.innerText = `Starting on: ${new Date(start).toDateString()}`;
    likesNum.innerText = `${likes.length} likes`;
    jobDescTitle.innerText = 'Job Description'; 
    descJob.innerText = description;
    commentsNum.innerText = `${comments.length} comments`;

    // Connect elems
    div.append(name, postedTime, titleJob, dateStart, imageJob, jobDescTitle, descJob, commentsNum, likesNum);
    if (children !== undefined) {
        div.appendChild(children);
    }
    return div;
};