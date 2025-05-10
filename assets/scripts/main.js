// main.js

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

// Starts the program, all function calls trace back here
function init() {
	// Get the recipes from localStorage
	let recipes = getRecipesFromStorage();
	// Add each recipe to the <main> element
	addRecipesToDocument(recipes);
	// Add the event listeners to the form elements
	initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() {
	// A9. TODO - Complete the functionality as described in this function
	//           header. It is possible in only a single line, but should
	//           be no more than a few lines.
	const storage = JSON.parse(localStorage.getItem('recipes'));


	if (storage === null) {
		return [];
	} else {
		return storage;
	}
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
	console.log("inside");
	// A10. TODO - Get a reference to the <main> element
	const mainElement = document.querySelector('main'); 
	console


	// A11. TODO - Loop through each of the recipes in the passed in array,
	//            create a <recipe-card> element for each one, and populate
	//            each <recipe-card> with that recipe data using element.data = ...
	//            Append each element to <main>
	recipes.forEach((curr) => {
		const toAdd = document.createElement('recipe-card');
		toAdd.data = curr;
		mainElement.appendChild(toAdd);
	});
}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
	// EXPLORE - START (All explore numbers start with B)
	// B1. TODO - Complete the functionality as described in this function
	//            header. It is possible in only a single line, but should
	//            be no more than a few lines.
	console.log("recipes", recipes);
	localStorage.setItem('recipes', JSON.stringify(recipes));
}

/**
 * Adds the necessary event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {
	// B2. TODO - Get a reference to the <form> element
	const pageForm = document.querySelector("form");
	console.log(pageForm);
	
	// B3. TODO - Add an event listener for the 'submit' event, which fires when the
	//            submit button is clicked
	pageForm.addEventListener("submit", (event) => {
		event.preventDefault();
		// Steps B4-B9 will occur inside the event listener from step B3
		// B4. TODO - Create a new FormData object from the <form> element reference above
		let formData = new FormData(pageForm);
		console.log("form:",formData.get('Text'));
		
		// B5. TODO - Create an empty object (we'll refer to this object as recipeObject to
		//            make this easier to read), and then extract the keys and corresponding
		//            values from the FormData object and insert them into recipeObject
		let recipeObject = { };
		for (const [key, value] of formData) {
			recipeObject[key] = value;
		}
		console.log(recipeObject);

		// B6. TODO - Create a new <recipe-card> element
		const card = document.createElement('recipe-card');
		
		// B7. TODO - Add the recipeObject data to <recipe-card> using element.data
		card.data = recipeObject;
		console.log("card data", card.data);

		// B8. TODO - Append this new <recipe-card> to <main>
		const mainElement = document.querySelector('main'); 
		mainElement.appendChild(card);
		
		// B9. TODO - Get the recipes array from localStorage, add this new recipe to it, and
		//            then save the recipes array back to localStorage
		let storedRecipes = getRecipesFromStorage();
		console.log("stored recipe", storedRecipes);
		storedRecipes.push(recipeObject);
		console.log("stored recipe after", storedRecipes);
		saveRecipesToStorage(storedRecipes);

	})
	
	
	// B10. TODO - Get a reference to the "Clear Local Storage" button
	const empty = document.getElementsByClassName("danger")[0];

	// B11. TODO - Add a click event listener to clear local storage button
	empty.addEventListener("click", (event) => {
		// Steps B12 & B13 will occur inside the event listener from step B11
		// B12. TODO - Clear the local storage
		localStorage.clear();
		
		// B13. TODO - Delete the contents of <main>
		const mainElement = document.querySelector('main'); 
		mainElement.innerHTML = "";
	});
}