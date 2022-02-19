// Namespace for App
const bookApp = {};

const form = document.querySelector('form');

// Event Listener to get book subject
bookApp.getSubject = function () {
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        bookApp.getBooks();
    })
}


// Getting data from API
bookApp.getBooks = function () {
    // create our url endpoint based on users selection
    const selection = document.querySelector('#bookSubject');
    let selectedValue = selection.value
    const apiKey = 'AIzaSyBt9dJvG6Epw3nwxoLVa_AU_4CzUGOdWzc'
    
    // Note: Didn't use the URl constructor below because it wouldn't allow us to leave the q parameter blank and search for subject
    const bookUrl = `https://www.googleapis.com/books/v1/volumes?q=+subject:${selectedValue}&orderBy=newest&maxResults=12&langRestrict=en&key=${apiKey}`;

    // If statement to prevent submitting form without selection
    if (selection.value === 'initial'){
        alert('Please select a subject!')
    } 
    else {
        const mainSection = document.querySelector('main');
        mainSection.classList.add('newBackgroundColor');

        fetch(bookUrl)
            .then(function (response) {
                return response.json()
            })
            .then(function (jsonResponse) {
                const worksData = jsonResponse.items;
                bookApp.displayBooks(worksData);
            })
    }

}

// Adding book data to the page
bookApp.displayBooks = function (dataFromApi) {

    const bookUl = document.querySelector('.bookResults');
    bookUl.innerHTML = '';

    // Book Result Header display and text creation -------
    const bookResultsHeadingContainer = document.querySelector('.headingContainer');
    const bookResultsHeading = document.querySelector('h2');

    bookResultsHeading.innerHTML = '';
    bookResultsHeading.textContent = "here are your book suggestions:";
    bookResultsHeadingContainer.appendChild(bookResultsHeading);

    // Use loop to create an li element for each result in the array that displays: cover, title, author, description and learn more link
    dataFromApi.forEach(function (bookObject) {
        // List of Books display and text creation --------
        const bookList = document.createElement('li');
        bookList.classList.add('bookListLi');
        const title = document.createElement('h3');
        const author = document.createElement('h4');
        const image = document.createElement('img');

        // Book Description display and text creation
        const descriptionContainer = document.createElement('div')
        const description = document.createElement('p');
        const googleButton = document.createElement('a');
        descriptionContainer.classList.add('bookDescriptionContainer');
        googleButton.classList.add('googleBookLink');

        // Info from API
        title.textContent = bookObject.volumeInfo.title;
        author.textContent = bookObject.volumeInfo.authors;
        description.textContent = bookObject.volumeInfo.description;
        googleButton.textContent = "Learn More"

        // Creating image and info links
        image.src = bookObject.volumeInfo.imageLinks.thumbnail;
        image.alt = `${bookObject.volumeInfo.title} cover`
        googleButton.href = bookObject.volumeInfo.infoLink
        googleButton.target = "_blank"
        googleButton.rel = "noopener noreferrer";

        // Tab index for accessibility
        bookList.tabIndex = "0";

        // Appending all data to the page
        bookList.appendChild(image);
        bookList.appendChild(title);
        bookList.appendChild(author);
        bookList.appendChild(descriptionContainer)
        bookList.appendChild(googleButton)
        descriptionContainer.appendChild(description);
        bookUl.appendChild(bookList);

        // Event listener that allows li to hide the image and show the description
        bookList.addEventListener('click', function () {
            bookList.classList.toggle('fullWidth')
            image.classList.toggle('hidden');
            author.classList.toggle('hidden');
            description.classList.toggle('show');
            googleButton.classList.toggle('show');
        })

        // Added accessibility fix for focus/keyboard use
        bookList.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                bookList.classList.toggle('fullWidth')
                image.classList.toggle('hidden');
                author.classList.toggle('hidden');
                description.classList.toggle('show');
                googleButton.classList.toggle('show');
            }
        })
    })
}

bookApp.init = function () {
    bookApp.getSubject()
}


bookApp.init()