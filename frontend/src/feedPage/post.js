// Who made by
// When posted
// Job content
    // Image
    // Job title
    // Starting data
    // How many likes
    // Job description
    // Job comments

import { fetchUser } from "../helpers.js";
export const post = ( { creatorId, createdAt, image, title, start, likes, description, comments }, children=null ) => {
    // Create elems
    const div = document.createElement('div');
    const name = document.createElement('b');
    const postedTime = document.createElement('b');
    const imageJob = document.createElement('img');
    const titleJob = document.createElement('h1');
    const dateStart = document.createElement('b');
    const likesNum = document.createElement('b');
    const descJob = document.createElement('p');
    const commentNum = document.createElement('b');
    const jobDescTitle = document.createElement('h2');
    const showLikes = document.createElement('button');
    const usersLiked = document.createElement('b');
    
    const delta = new Date() - new Date(createdAt);
    const deltaStr = `${new Date(delta).getHours()} ${new Date(delta).getMinutes()}`
    // Add attr
    div.className = 'post';
    fetchUser(creatorId).then(res => res.name).then(res => name.innerText = `Posted by: ${res}`);
    postedTime.innerText = `Posted on: ${delta > 86400000 ? new Date(createdAt).toDateString() : deltaStr}`
    imageJob.alt = 'Picture description of job';
    imageJob.src = image;
    titleJob.innerText = title;
    dateStart.innerText = `Starting on: ${new Date(start).toDateString()}`;
    likesNum.innerText = `${likes.length} likes`;
    descJob.innerText = description;
    commentNum.innerText = `${comments.length} comments`;
    jobDescTitle.innerText = 'Job Description'; 
    showLikes.innerText = 'Show Likes';

    // Add event handlers
    const onShowLikes = (e) => {
        e.preventDefault();
        if (usersLiked.style.display === "none") {
            usersLiked.style.display = "flex";
            usersLiked.innerText = likes;
        } else {
            usersLiked.style.display = "none";
        }
    }
    showLikes.addEventListener('click', onShowLikes);
    
    // Connect elems
    div.append(name, postedTime, titleJob, dateStart, imageJob, jobDescTitle, descJob, commentNum, likesNum, children);
    return div;
};