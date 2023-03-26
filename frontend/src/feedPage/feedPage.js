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
import { logoutButton } from "../loginPage/logoutButton.js";

export const feedPage = () => {
    // Create elements
    document.body.classList.add('background');
    const div = document.createElement('div');
    const header = document.createElement('header');
    const showModalBtn = document.createElement('button');
    
    // Modal items below
    showModalBtn.classList.add('subBtn');
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

    // Add header attributes
    div.id = 'feedpage';
    const accountDiv = document.createElement('div');
    accountDiv.classList.add('div-vertical');

    const navBar = document.createElement('div');
    navBar.classList.add('div-horizontal');
    navBar.classList.add('customHeaderDiv');

    navBar.append(showModalBtn, addJobLink(), logoutButton());
    accountDiv.append(linkedAccount(window.localStorage.getItem('userId')), navBar);
    header.append(accountDiv);

    // Add elements after
    const createPostChild = ({ likes, id, comments }) => {
        const postChildDiv = document.createElement('div');
        postChildDiv.classList.add('postChildDiv');
        const likesDiv = document.createElement('div');
        likesDiv.classList.add('div-horizontal');
        likesDiv.append(likeJob(id, !likes.map(each => each.userId.toString()).includes(localStorage.getItem('userId'))), showLikes(likes.map(each => each.userName.toString())));
        postChildDiv.append(likesDiv, addComment(id), displayComments(comments));
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
        try {
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
        } catch (e) {
            if (e.name === "QuotaExceededError") {
                alert('Local storage space is full for offline feed');
            } else {
                // Dont show user any other err as this is for saving feed, so other errors will be shown appropriately by other fetch calls
                console.log(e);
            }
        }
        // return the feed so it can be kept in the thenable chain
        return feed;
    }
    // Variable for when fetch is firing as scroll can call fetch multiple times before a fetch resolves and append results multiple times prematurely
    let isFetchFiring = false;
    let offlineHasBeenCalled = false;
    const getOfflineFeed = () => {
        offlineHasBeenCalled = true;
        const feed = JSON.parse(localStorage.getItem('feed'));
        // const numToLoad = Math.min(feed.length - numPostsLoaded, 5);
        // const nextFeed = feed.splice(numPostsLoaded, numToLoad);
        // numPostsLoaded += numToLoad;
        feed.map(ea => post(ea, createPostChild(ea))).forEach(ea => div.append(ea));
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
        .then(() => offlineHasBeenCalled = false)
        .catch(res => {
            console.log(res);
            if (res.error === 'No network detected') {
                if (!offlineHasBeenCalled) { 
                    getOfflineFeed();
                }
            } else {
                alert(res.error);
            }
        });
    }
    fetchFeed();

    const livePoll = () => {
        // Clear interval if off of feed page
        if (!(document.body.contains(div))) {
            if (pollInterval !== undefined) {
                clearInterval(pollInterval);
                return;
            }
        }
        // Only live for first 5 post according to ED forum
        doFetch('/job/feed', undefined, 'GET', { 'start': 0}, window.localStorage.getItem('token'))
        .then(res => 'error' in res ? Promise.reject(res) : res)
        // Filter out if it is not loaded on screen yet to not mess with anything else
        .then(res => [JSON.parse(localStorage.getItem('feed')).map(ea => ea.id), res])
        .then(res => res[1].filter(ea => res[0].includes(ea.id)))
        .then(res => {
            const postIsEqual = (elem1, elem2) => {
                // Get elems and make sure theyre sorted same
                const belements1 = [...elem1.getElementsByTagName('b')].sort();
                const belements2 = [...elem2.getElementsByTagName('b')].sort();
                if (belements1.length !== belements2.length) {
                    return false;
                }
                for (let i = 0; i < belements1.length; i++) {
                    if (!belements1[i].isEqualNode(belements2[i])) {
                        return false;
                    }
                }
                return true;
            }
            for(let i = 0; i < res.length; i++) {
                // Get curr div in page, remove it's contents then replace it
                // with our newly created post div with updated information
                // only if it has been updated
                const newElem = post(res[i], createPostChild(res[i]));
                const currDiv = document.getElementById(res[i].id);
                if (postIsEqual(newElem, currDiv)) {
                    continue;
                }
                currDiv.innerText = '';
                currDiv.append(...newElem.children)
            }
        })
    };

    const pollInterval = setInterval(livePoll, 1500);
    // For infinite scroll
    document.addEventListener('scroll', () => {
        // documentElement scrollheight gets height of entire page, minus scrollY which is where the user is currently scrolled to. 
        // And if that is within the range of the viewport * 1.3 (as buffer space), then fetch the new content
        if (document.documentElement.scrollHeight - window.scrollY < window.innerHeight * 1.3 && !isFetchFiring) {
            isFetchFiring = true;
            fetchFeed();
        }
    });

    // Connect elements
    div.appendChild(header);
    return div;
};

