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

  function displayBooks(books) {
    const bookList = document.getElementById('books');
    bookList.innerHTML = '';  // Clear previous content
    books.forEach(book => {
      const bookDiv = document.createElement('div');
      bookDiv.classList.add('book');
      bookDiv.innerHTML = `
        <h3>${book.title}</h3>
        <p>Author: ${book.author}</p>
        <button data-id="${book.id}" class="view-details">View Details</button>
      `;
      bookList.appendChild(bookDiv);
    });
  }