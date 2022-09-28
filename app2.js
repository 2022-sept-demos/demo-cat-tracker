/* Imports */
import './auth/user.js';

import { renderCat } from './render-utils.js';

/* Get DOM Elements */
const addCatForm = document.getElementById('add-cat-form');
const removeButton = document.getElementById('remove-button');
const errorDisplay = document.getElementById('error-display');
const catList = document.getElementById('cat-list');

/* State */
let cats = [];
let error = null;

/* Events */

window.addEventListener('load', async () => {
    // > Part B: Add a click event listener for the catEl
    //      - call the async supabase function to delete all cats
    //        and get the response
    //      - set the cats and error state from the response
    //      - if there's an error call displayError
    //      - otherwise, display the cats
});

addCatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(addCatForm);
    const newCat = {
        description: formData.get('description'),
    };

    // > Part A: Call the function to create a cat, passing in "newCat":
    const response = await null; // ???
    error = response.error;
    const cat = response.data;

    if (error) {
        displayError();
    } else {
        cats.push(cat);
        displayCats();
        addCatForm.reset();
    }
});

removeButton.addEventListener('click', async () => {
    // > Part D: Call the async supabase function to delete all cats
    const response = null; // change me
    error = response.error;

    if (error) {
        displayError();
    } else {
        // > Part D: reset cats state to an empty array:

        displayCats();
    }
});

/* Display Functions */

function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}

function displayCats() {
    catList.innerHTML = '';

    for (const cat of cats) {
        const catEl = renderCat(cat);
        catList.append(catEl);

        // > Part C: Add a click event listener for the catEl
        //      - call the async supabase function to delete all cats
        //        and get the response
        //      - if there's an error, set error state and call displayError
        //      - otherwise:
        //          - find the index of cat in cats
        //          - update that index of cats with the response data
        //          - redisplay the cats
    }
}
