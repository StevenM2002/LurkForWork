import { linkedAccount } from "../accountPage/linkedAccount.js";
import { doFetch, fetchUser } from "../helpers.js";
import { modalComponent } from "../modalComponent.js/modalComponent.js";
import { addComment } from "./addComment.js";
import { post } from "./post.js";
import { watchAccByEmail } from "./watchAccByEmail.js";
import { showLikes } from "./showLikes.js";
import { likeJob } from "./likeJob.js";
import { displayComments } from "./displayComments.js";
import { addJobLink } from "../addJobPage/addJobLink.js";

export const feedPage = () => {
    // Create elems
    document.body.classList.add('background');
    const div = document.createElement('div');
    const header = document.createElement('header');
    const showModalBtn = document.createElement('button');

    showModalBtn.classList.add('subBtn');
    
    // Modal stuff below
    showModalBtn.innerText = 'Watch a user';
    let isModalVisible = false;
    const modalCallback = () => {
        isModalVisible = false;
        if (!modal.classList.contains('hidden')) {
            modal.classList.add('hidden');
        }
    };
    const modal = modalComponent(modalCallback, watchAccByEmail());
    modal.classList.add('hidden');
    showModalBtn.addEventListener('click', (e) => {
        e.preventDefault();
        isModalVisible = true;
        if (modal.classList.contains('hidden')) {
            modal.classList.remove('hidden');
        }
    });
    div.append(modal);

    // Add attr
    div.id = 'feedpage';
    const watcherBtnDiv = document.createElement('div');
    watcherBtnDiv.className = 'watcherBtnDiv';
    watcherBtnDiv.append(showModalBtn, addJobLink());
    header.append(linkedAccount(window.localStorage.getItem('userId')), watcherBtnDiv);
    // Add elems
    const createPostChild = ({ likes, id, comments }) => {
        const postChildDiv = document.createElement('div');
        postChildDiv.className = 'postChildDiv';
        postChildDiv.append(showLikes(likes.map(each => each.userName.toString())), likeJob(id, !likes.map(each => each.userId.toString()).includes(localStorage.getItem('userId'))), displayComments(comments), addComment(id));
        return postChildDiv;
    }

    
    let numPostsLoaded = 0;
    // Save the feed into localstorage for offline use
    const saveFeed = feed => {
        let currFeed = localStorage.getItem('feed');
        let currProfiles = localStorage.getItem('idprofile');
        // If there are 0 posts loaded, then that means the page is at base state, so reset cached posts to get newest updates
        if (currFeed === null || numPostsLoaded === 0) {
            localStorage.setItem('feed', '[]');
            localStorage.setItem('idprofile', '{}');
            currFeed = localStorage.getItem('feed');
            currProfiles = localStorage.getItem('idprofile');
        }
        
        
        currFeed = JSON.parse(currFeed);
        currProfiles = JSON.parse(currProfiles);
        // Cache items
        currFeed = [...currFeed, ...feed];
        localStorage.setItem('feed', JSON.stringify(currFeed));
        // Set profile cache for self and then for feed
        fetchUser(localStorage.getItem('userId'))
        .then(res => 'error' in res ? Promise.reject(res) : res)
        .then(res => currProfiles[res.id] = {name: res.name, image: res.image})
        .catch(e => alert(e.error));
        feed.forEach(ea => 
            fetchUser(ea.creatorId)
            .then(res => 'error' in res ? Promise.reject(res) : res)
            .then(res => currProfiles[res.id] = {name: res.name, image: res.image})
            .then(() => localStorage.setItem('idprofile', JSON.stringify(currProfiles)))
            .catch(e => alert(e.error))
        );
        // return the feed so it can be kept in the thenable chain
        return feed;
    }
    // Variable for when fetch is firing as scroll can call fetch multiple times before a fetch resolves and append results multiple times prematurely
    let isFetchFiring = false;

    const getOfflineFeed = () => {
        const feed = JSON.parse(localStorage.getItem('feed'));
        const numToLoad = Math.min(feed.length - numPostsLoaded, 5);
        const nextFeed = feed.splice(numPostsLoaded, numToLoad);
        numPostsLoaded += numToLoad;
        nextFeed.map(ea => post(ea, createPostChild(ea))).forEach(ea => div.append(ea));
    }

    const fetchFeed = () => {
        doFetch('/job/feed', undefined, 'GET', { 'start': numPostsLoaded }, window.localStorage.getItem('token'))
        .then(res => 'error' in res ? Promise.reject(res) : res)
        .then(res => res.sort(((a, b) => a.createdAt < b.createdAt ? 1 : -1)))
        .then(res => saveFeed(res))
        .then(res => {
            numPostsLoaded += res.length;
            return res;
        })
        .then(res => res.map(ea => post(ea, createPostChild(ea))))
        .then(res => div.append(...res))
        .then(() => isFetchFiring = false)
        .catch(res => {
            if (res.error === 'No network detected') {
                getOfflineFeed();
            } else {
                alert(res.error);
            }
        });
    }
    fetchFeed();
    // For infinite scroll
    document.addEventListener('scroll', () => {
        // documentElement scrollheight gets height of entire page, minus scrollY which is where the user is currently scrolled to. And if that is within the range of the viewport * 1.3 (as buffer space), then fetch the new content
        if (document.documentElement.scrollHeight - window.scrollY < window.innerHeight * 1.3 && !isFetchFiring) {
            isFetchFiring = true;
            fetchFeed();
        }
    });

    div.appendChild(header);
    return div;
};

