import { doFetch } from "../helpers.js";
import { post } from "./post.js";

export const feedPage = () => {
    // Create elems
    const div = document.createElement('div');

    // Add attr
    div.id = 'feedpage';

    // Add elems
    doFetch('/job/feed', undefined, 'GET', { 'start': 0 }, window.localStorage.getItem('token'))
    .then(res => res.sort(ea => ea.createdAt))
    .then(res => res.map(ea => post(ea)))
    .then(res => div.append(...res));

    return div;
};