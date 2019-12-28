// Values

const API_KEY = '5b912386d63e0f1b35005d2704d11c94';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
const url = 'https://api.themoviedb.org/3/search/movie?api_key=5b912386d63e0f1b35005d2704d11c94';
// Elementer fra DOM

const buttonElement = document.querySelector('#search');
const inputElement = document.querySelector('#inputValue');
const movieSearchable = document.querySelector('#movies-searchable');


function movieSection(movies) {
	return movies.map((movie) => {
		return `
<img src=${IMAGE_URL + movie.poster_path} data-movie-id=${movie.id}/>
		`;
	})}


function createMovieContainer(movies) {
	const movieElement = document.createElement('div');
	movieElement.setAttribute('class', 'movie');

	const movieTemplate = `
	<section class="section">
${movieSection(movies)}
	</section>
	<div class="content">
<p id="content-close">X</p>
	</div>
	`;

	movieElement.innerHTML = movieTemplate;
	return movieElement;
}

// Movie data i console og skabelse af ny url når man søger

buttonElement.onclick = function(event) {
	event.preventDefault();
	const value = inputElement.value;
	const newUrl = url + '&query=' + value;

	fetch(newUrl)
	  .then((res) => res.json())
		.then((data) => {
			// Alt film Data
			const movies = data.results;
			const movieBlock = createMovieContainer(movies);
			movieSearchable.appendChild(movieBlock);
			console.log('Data:  ', data);
		})
		.catch((error) => {
			console.log('Error: ', error);
		});
	console.log('Value: ', value);
}
