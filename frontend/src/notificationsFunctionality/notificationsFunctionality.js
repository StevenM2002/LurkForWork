import { doFetch, fetchUser } from "../helpers.js";

const fetchLatestFeed = () => doFetch('/job/feed', undefined, 'GET', {start: 0}, localStorage.getItem('token')).then(res => 'error' in res ? Promise.reject(res) : res);

export const initNotif = () => {
    if (Notification.permission === 'denied') {
        alert('Please allow notifications');
        return;
    }
    if (Notification.permission === 'default') {
        Notification.requestPermission();
    }
}

export const saveDataNotifs = () => {
    fetchLatestFeed()
    .then(res => {
        if (res.length > 0) {
            localStorage.setItem('latestPostDate', res[0].createdAt);
        } else {
            localStorage.setItem('latestPostDate', new Date().toISOString());
        }
    })
    .catch(e => console.log(e));
};

export const newJobNotif = () => {
    initNotif();
    if (Notification.permission !== 'granted') {
        alert('Please allow notifications');
        return;
    }
    const isGreaterDate = (date1, date2) => new Date(date1).getTime() > new Date(date2).getTime();
    const doNotif = () => {
        fetchLatestFeed()
        .then(res => {
            if (res.length === 0) {
                return;
            }
            if (isGreaterDate(res[0].createdAt, localStorage.getItem('latestPostDate'))) {
                fetchUser(res[0].creatorId)
                .then(innerRes => new Notification('New job posted', {body: `Check out ${innerRes.name}'s new job`}))
                .then(() => localStorage.setItem('latestPostDate', res[0].createdAt));
            }
        })
        .catch(e => console.log(e));
    };
    setInterval(() => doNotif(), 3000);
};