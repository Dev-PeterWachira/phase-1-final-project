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
  document.getElementById('books').addEventListener('click', (e) => {
    if (e.target.classList.contains('view-details')) {
      const bookId = e.target.dataset.id;
      fetch(`${apiURL}/${bookId}`)
        .then(response => response.json())
        .then(data => displayDetails(data))
        .catch(error => console.error('Error fetching book details:', error));
    }
  });
  function displayDetails(book) {
    const detailsDiv = document.getElementById('details');
    detailsDiv.innerHTML = `
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Review: ${book.review}</p>
    `;
  }
  document.getElementById('review-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newBook = {
      title: document.getElementById('book-title').value,
      author: document.getElementById('book-author').value,
      review: document.getElementById('book-review').value
    };

    fetch(apiURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBook)
    })
      .then(response => response.json())
      .then(data => {
        // Clear form and refresh book list
        e.target.reset();
        fetchBooks();
      })
      .catch(error => console.error('Error adding review:', error));
  });

  // Initialize by fetching and displaying books
  fetchBooks();
});