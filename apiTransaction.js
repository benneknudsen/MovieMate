// Values

const API_KEY = '5b912386d63e0f1b35005d2704d11c94';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
const url = 'https://api.themoviedb.org/3/search/movie?api_key=5b912386d63e0f1b35005d2704d11c94';

function generateUrl(path) {
	const url = `https://api.themoviedb.org/3${path}?api_key=5b912386d63e0f1b35005d2704d11c94`;
	return url;

}

function requestMovies(url, onComplete, onError) {
	fetch(url)
	  .then((res) => res.json())
		.then(onComplete)
		.catch(onError);

}

function searchMovie(value) {
	const path = '/search/movie';
	const url = generateUrl(path) + '&query=' + value;
requestMovies(url, renderSearchMovies, handleError);
}

function getUpcomingMovies() {
	const path = '/movie/upcoming';
	const url = generateUrl(path);
requestMovies(url, renderSearchMovies, handleError);
}

function getTopRatedMovies() {
	const path = '/movie/top_rated';
	const url = generateUrl(path);
requestMovies(url, renderSearchMovies, handleError);
}