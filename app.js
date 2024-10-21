{
    "books": [
      { "id": 1, "title": "Book One", "author": "Author One", "review": "Great read!" },
      { "id": 2, "title": "Book Two", "author": "Author Two", "review": "Informative!" }
    ]
  }
  



document.addEventListener("DOMContentLoaded", () => {
const apiURL = 'https://exampleapi.com/books';

function fetchBooks() {
    fetch(apiURL)
      .then(response => response.json())
      .then(data => displayBooks(data))
      .catch(error => console.error('Error fetching books:', error));
  }