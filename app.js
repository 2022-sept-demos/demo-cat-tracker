/* Imports */
import './auth/user.js';
import { createCat } from './fetch-utils.js';

import { renderCat } from './render-utils.js';

/* Get DOM Elements */
const addCatForm = document.getElementById('add-cat-form');
// const removeButton = document.getElementById('remove-button');
const errorDisplay = document.getElementById('error-display');
const catList = document.getElementById('cat-list');

/* State */
let cats = [];
let error = null;

/* Events */
addCatForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(addCatForm);

    const newCat = {
        name: formData.get('name'),
    };

    const response = await createCat(newCat);
    error = response.error;
    const cat = response.data;

    if (error) {
        displayError();
    } else {
        cats.push(cat);
        displayCats();
    }

    addCatForm.reset();
});

function displayError() {
    console.error(error);
    errorDisplay.textContent = error.message;
}

function displayCats() {
    catList.innerHTML = '';

    for (const cat of cats) {
        const catEl = renderCat(cat);
        catList.append(catEl);
    }
}
