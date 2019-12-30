// Values

const API_KEY = '5b912386d63e0f1b35005d2704d11c94';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
const url = 'https://api.themoviedb.org/3/search/movie?api_key=5b912386d63e0f1b35005d2704d11c94';
// Elementer fra DOM

const buttonElement = document.querySelector('#search');
const inputElement = document.querySelector('#inputValue');
const movieSearchable = document.querySelector('#movies-searchable');

function generateUrl(path) {
	const url = `https://api.themoviedb.org/3${path}?api_key=5b912386d63e0f1b35005d2704d11c94`;
	return url;

}

function movieSection(movies) {
	return movies.map((movie) => {
		if(movie.poster_path){
			return `<img 
			src=${IMAGE_URL + movie.poster_path} 
			data-movie-id=${movie.id}
			/>`;
		}
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

function renderSearchMovies(data) {
	movieSearchable.innerHTML = '';
	const movies = data.results;
	const movieBlock = createMovieContainer(movies);
	movieSearchable.appendChild(movieBlock);
	console.log('Data:  ', data);
}

buttonElement.onclick = function(event) {
	event.preventDefault();
	const value = inputElement.value;
	const path = '/search/movie';
	const newUrl = generateUrl(path) + '&query=' + value;

	fetch(newUrl)
	  .then((res) => res.json())
		.then(renderSearchMovies)
		.catch((error) => {
			console.log('Error: ', error);
		});

	inputElement.value = '';	
	console.log('Value: ', value);
}

function createIframe(video) {
	const iframe = document.createElement('iframe');
	iframe.src = `https://youtube.com/embed/${video.key}`;
	iframe.width = 360;
	iframe.height = 315;
	iframe.allowFullscreen = true;

	return iframe;
}


// Event til at tilføje og fjerne Content boksen under film posters

document.onclick = function() {
	const target = event.target;

	if(target.tagName.toLowerCase() === 'img') {
		const movieId = target.dataset.movieId;
		const section = event.target.parentElement;
		const content = section.nextElementSibling;
		content.classList.add('content-display');

		const path = `/movie/${movieId}/videos`;
		const url = generateUrl(path);

		// Fetch film trailers

		fetch(url)
		.then((res) => res.json())
		.then((data) => {

		   console.log('Videos: ', data);
		   const videos = data.results;
		   const length = videos.length > 2 ? 2 : videos.length;
		   const iframeContainer = document.createElement('div');
		   
		   for (let i = 0; i < length; i++) {
const video = videos[i];
const iframe = createIframe(video);
iframeContainer.appendChild(iframe);
content.appendChild(iframeContainer);
		   }
		})
		.catch((error) => {
			console.log('Error: ', error);
		});
	}
	
	if (target.id === 'content-close') {
		const content = target.parentElement;
		content.classList.remove('content-display');
	}
}

jQuery(window).load(function() {
	// will first fade out the loading animation
jQuery("#status").delay(1200).fadeOut();
	// will fade out the whole DIV that covers the website.
jQuery("#preloader").delay(1200).fadeOut("slow");
})
