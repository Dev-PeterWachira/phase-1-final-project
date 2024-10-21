document.addEventListener("DOMContentLoaded", () => {
    const apiURL = 'https://openlibrary.org/api/books?bibkeys=ISBN:0451526538&format=json&jscmd=data'; 
  
    function fetchBooks(searchTerm) {
        const url = `${apiURL}?q=${encodeURIComponent(searchTerm)}`;
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => displayBooks(data.items)) 
            .catch(error => console.error('Error fetching books:', error));
    }
  
    function displayBooks(books) {
        const bookList = document.getElementById('books');
        bookList.innerHTML = '';  // Clear previous content
        if (books) {
            books.forEach(book => {
                const bookInfo = book.volumeInfo; // Access the volumeInfo object
                const bookDiv = document.createElement('div');
                bookDiv.classList.add('book');
                bookDiv.innerHTML = `
                    <h3>${bookInfo.title}</h3>
                    <p>Author: ${bookInfo.authors ? bookInfo.authors.join(', ') : 'Unknown'}</p>
                    <p>${bookInfo.description ? bookInfo.description : 'No description available.'}</p>
                    <img src="${bookInfo.imageLinks ? bookInfo.imageLinks.thumbnail : ''}" alt="${bookInfo.title}">
                `;
                bookList.appendChild(bookDiv);
            });
        } else {
            bookList.innerHTML = '<p>No results found.</p>';
        }
    }
  
    // Add event listener for the search form
    const searchForm = document.getElementById('search-form');
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchTerm = document.getElementById('search-input').value;
        fetchBooks(searchTerm);
    });
  
    // Debounce function
    function debounce(func, delay) {
        let timeoutId;
        return function (...args) {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                func.apply(null, args);
            }, delay);
        };
    }

    const debouncedFetchBooks = debounce(fetchBooks, 500);
    document.getElementById('search-input').addEventListener('input', (e) => {
        const searchTerm = e.target.value;
        if (searchTerm) {
            debouncedFetchBooks(searchTerm);
        }
    });
  
    document.getElementById('review-form').addEventListener('submit', (e) => {
        e.preventDefault();
  
        const newBook = {
            title: document.getElementById('book-title').value,
            author: document.getElementById('book-author').value,
            review: document.getElementById('book-review').value
        };
  
        fetch('http://localhost:3000/books', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newBook)
        })
        .then(response => response.json())
        .then(data => {
            e.target.reset(); 
            fetchBooks(newBook.title); 
        })
        .catch(error => console.error('Error adding review:', error));
    });
  
    fetchBooks('JavaScript'); 
});
