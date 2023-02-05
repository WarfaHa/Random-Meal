// global variables
// references the button and container
const get_meal_btn =document.getElementById('get_meal');
const meal_container = document.getElementById('meal');

// event listener for button
get_meal_btn.addEventListener('click', () => {

// https://www.themealdb.com/api.php
// according to the api, we can fetch a random meal using '.../random.php'
fetch('https://www.themealdb.com/api/json/v1/1/random.php')
.then(res => res.json())
.then(res => {
    createMeal(res.meals[0]);
})
.catch(err => {
    console.warn(err);
})
})

const createMeal = meal => {

const ingredients =[];

//  The ingredients,
//  are separated into their own properties in the object upto 20 like:
//  strIngredient1, strIngredient2, etc
// Get all ingredients from the object

for (let i=1; i<= 20; i++){
if (meal[`strIngredient${i}`]){
ingredients.push(
    `${meal[`strIngredient${i}`]}- ${meal[`strMeasure${i}`]}`
);
}else{
// Stop if there are no more ingredients
    break;
}
}

// This is going to hold the entire HTML markup
const newInnerHTML = `
<div class="row"><h3>${meal.strMeal}</h3> <br>
			<div class="columns five">
				<img src="${meal.strMealThumb}" alt="Meal Image">
				${
					meal.strCategory
						? `<p><strong>Category:</strong> ${meal.strCategory}</p>`
						: ''
				}
				${meal.strArea ? `<p><strong>Area:</strong> ${meal.strArea}</p>` : ''}
				${
					meal.strTags
						? `<p><strong>Tags:</strong> ${meal.strTags
								.split(',')
								.join(', ')}</p>`
						: ''
				}
				<h5>Ingredients:</h5>
				<ul>
					${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
				</ul>
			</div>
			<div class="columns seven">
				<h4>Meal Instructions:</h4>
				<p>${meal.strInstructions}</p>
			</div>
		</div>
		${
			meal.strYoutube
				? `
		<div class="row">
			<h5>Video Recipe:</h5>
			<div class="videoWrapper">
				<iframe width="420" height="315"
				src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
				</iframe>
			</div>
		</div>`
				: ''
		}
	`;
    meal_container.innerHTML = newInnerHTML;
};