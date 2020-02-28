
// Elementer fra DOM

const buttonElement = document.querySelector('#search');
const inputElement = document.querySelector('#inputValue');
const movieSearchable = document.querySelector('#movies-searchable');


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



function handleError(error){
	console.log('Error: ', error);
}

buttonElement.onclick = function(event) {
	event.preventDefault();
	const value = inputElement.value;
searchMovie(value);

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


function createVideoTemplate(data, content) {
	content.innerHTML = '<p id="content-close">X</p>';
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
		.then((data) => createVideoTemplate(data, content))
		.then((data) => {

	
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

getUpcomingMovies();



jQuery(window).load(function() {
	// will first fade out the loading animation
jQuery("#status").delay(1200).fadeOut();
	// will fade out the whole DIV that covers the website.
jQuery("#preloader").delay(1200).fadeOut("slow");
})
