
// Elementer fra DOM

const buttonElement = document.querySelector('#search');
const inputElement = document.querySelector('#inputValue');
const movieSearchable = document.querySelector('#movies-searchable');
const movieContainer = document.querySelector('#movies-container');

function movieSection(movies) {
	const section = document.createElement('section');
	section.classList = 'section';
	
	movies.map((movie) => {
		if(movie.poster_path){
			const img = document.createElement('img');
			img.src = IMAGE_URL + movie.poster_path;
			img.setAttribute('data-movie-id', movie.id);
			
			section.appendChild(img);
		}
	})

	return section;
}



function createMovieContainer(movies, title = '') {
	const movieElement = document.createElement('div');
	movieElement.setAttribute('class', 'movie');

const header = document.createElement('h2');
header.innerHTML = title;

	const content = document.createElement('div');
	content.classList = 'content';

const contentClose = `<p id="content-close">X</p>`

content.innerHTML = contentClose;

	
const section = movieSection(movies);
	movieElement.appendChild(header);
	movieElement.appendChild(section);
	movieElement.appendChild(content);
	return movieElement;
}

// Movie data i console og skabelse af ny url når man søger

function renderSearchMovies(data) {
	movieSearchable.innerHTML = '';
	const movies = data.results;
	const movieBlock = createMovieContainer(movies);
	movieSearchable.appendChild(movieBlock);
	
}

function renderMovies(data) {

	const movies = data.results;
	const movieBlock = createMovieContainer(movies, this.title);
	movieContainer.appendChild(movieBlock);
	
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
getTopRatedMovies();
getPopularMovies();

jQuery(window).load(function() {
	// will first fade out the loading animation
jQuery("#status").delay(1200).fadeOut();
	// will fade out the whole DIV that covers the website.
jQuery("#preloader").delay(1200).fadeOut("slow");
})
