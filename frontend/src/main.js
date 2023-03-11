import { BACKEND_PORT } from './config.js';
import { feedPage } from './feedPage/feedPage.js';
// A helper you may want to use when uploading new images to the server.
import { fileToDataUrl } from './helpers.js';
import { loginPage } from './loginPage/loginPage.js';
import { registrationPage } from './registrationPage/registrationPage.js';


const routes = {
    '#login': loginPage(),
    '#register': registrationPage(),
    '#feed': feedPage(),
}

// Routing for when user first opens site
document.body.append(...Object.values(routes));
document.querySelectorAll('body > div').forEach(elem => elem.classList.add('hidden'));
try {
    routes[location.hash].classList.remove('hidden');
} catch (TypeError) {
    alert('This route does not exist');
}

// Routing for when user changes hash url while they are in application
const handleHashChange = () => {
    document.querySelectorAll('body > div').forEach(elem => elem.classList.add('hidden'));
    try {
        routes[location.hash].classList.remove('hidden');
    } catch (TypeError) {
        alert('This route does not exist');
    }
}
window.onhashchange = handleHashChange;