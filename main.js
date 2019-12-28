// Values

const API_KEY = '5b912386d63e0f1b35005d2704d11c94';

const url = 'https://api.themoviedb.org/3/search/movie?api_key=5b912386d63e0f1b35005d2704d11c94';
// Elementer fra DOM

const buttonElement = document.querySelector('#search');
const inputElement = document.querySelector('#inputValue');




buttonElement.onclick = function(event) {
	event.preventDefault();
	const value = inputElement.value;
	const newUrl = url + '&query=' + value;

	fetch(newUrl)
	  .then((res) => res.json())
		.then((data) => {
			console.log('Data:  ', data);
		})
		.catch((error) => {
			console.log('Error: ', error);
		});
	console.log('Value: ', value);
}
