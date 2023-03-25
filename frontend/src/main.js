import { accountPage } from './accountPage/accountPage.js';
import { addJobPage } from './addJobPage/addJobPage.js';
import { BACKEND_PORT } from './config.js';
import { editAccountPage } from './editAccountPage/editAccountPage.js';
import { feedPage } from './feedPage/feedPage.js';
import { loginPage } from './loginPage/loginPage.js';
import { notFoundPage } from './notFoundPage/notFoundPage.js';
import { initNotif, newJobNotif, saveDataNotifs } from './notificationsFunctionality/notificationsFunctionality.js';
import { registrationPage } from './registrationPage/registrationPage.js';

try {
    initNotif();
    saveDataNotifs();
    newJobNotif();
} catch (e) {
}

const routes = {
    '#login': loginPage,
    '#register': registrationPage,
    '#feed': feedPage,
    '#account': accountPage,
    '#edit': editAccountPage,
    '#add': addJobPage,
}

// Routing for when user first opens site
try {
    document.body.appendChild(routes[location.hash.split('=')[0]]());
} catch (e) {
    document.body.appendChild(notFoundPage());
}

// Routing for when user changes hash url while they are in application
const handleHashChange = () => {
    document.body.textContent = '';
    try {
        document.body.appendChild(routes[location.hash.split('=')[0]]());
    } catch (TypeError) {
        document.body.appendChild(notFoundPage());
    }
}
window.onhashchange = handleHashChange;