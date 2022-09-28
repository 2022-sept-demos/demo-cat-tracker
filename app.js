/* Imports */
import './auth/user.js';
import { createCat, getCats, updateLives } from './fetch-utils.js';

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
window.addEventListener('load', async () => {
    // call the get all cats
    const response = await getCats();
    // check for errors and get the data
    error = response.error;
    cats = response.data;

    // display errors or cats
    if (error) {
        displayError();
    } else {
        displayCats();
    }
});

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
    // eslint-disable-next-line no-console
    console.error(error);
    errorDisplay.textContent = error.message;
}

function displayCats() {
    catList.innerHTML = '';

    for (const cat of cats) {
        const catEl = renderCat(cat);
        catList.append(catEl);

        catEl.addEventListener('click', async () => {
            if (cat.lives < 1) {
                return;
            }

            const response = await updateLives(cat.id, cat.lives - 1);
            error = response.error;
            const updatedCat = response.data;

            if (error) {
                displayError();
            } else {
                const index = cats.indexOf(cat);
                cats[index] = updatedCat;
                displayCats();
            }
        });
    }
}
