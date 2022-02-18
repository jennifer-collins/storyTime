// User navigates to landing page with drop down menu containing pre-selected book subjects


// API DATA
// create url to include the specific search parameters of pre-selected subject types (ex. canadian_poetry, romance, mystery etc.)
// use fetch('url') syntax to return the data in json format to console
// store the object data in variables
// object data we would like to appear on page:
// Book Title
// Author
// Book Cover Photo (in small, medium or large)

// once data is stored in these variables, create a section on the page and display the suggestions on the page
// append the information to the page using innerHTML or appendChild
// user will see 10-12 book suggestions returned on page based on the drop down menu selections

// FORM
// Add values of pre-selected book subjects to form options
// use document.querySelector to select element on form we would like to append these options to
// using separate template expressions to place the different search values into the dropdown list

// SEARCH FEATURE (STRETCH GOAL)
// create a search bar and submit button with event listener to remove default behaviour on 'submit'
// store values of this search in a variable that is converted to remove spaces " " and replace with "_" (as per syntax in API documentation)
// return this search and 10-12 specific book recommendations on page
// data to appear on page:
// Book Title
// Author
// Book Cover

// FILTER (stretch goal)
// filter data by language 


// BOOK DESCRIPTION (STRETCH GOAL)
// Have the book description appear on click
// add an event listener to the ul, then target the div within the li's to have the book description appear on 'click'
// target the element we want to create, create variable to store description data, append data to the page
// create a div within the li's with a class of bookDescription
// hide the div with display: none; until the event listener of 'click' is activated

// Namespace for App
const bookApp = {};

const form = document.querySelector('form');

bookApp.getSubject = function () {
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        bookApp.getBooks();

        const mainSection = document.querySelector('main');
        mainSection.classList.add('newBackgroundColor');
    })
}
// store the api call info



// getting data from api
bookApp.getBooks = function () {
    // create our url endpoint

    const selection = document.querySelector('#bookSubject');
    let selectedValue = selection.value
    const apiKey = 'AIzaSyBt9dJvG6Epw3nwxoLVa_AU_4CzUGOdWzc'

    // Note: Didn't use the URl constructor below because it wouldn't allow us to leave the q parameter blank and search for subject
    const bookUrl = `https://www.googleapis.com/books/v1/volumes?q=+subject:${selectedValue}&orderBy=newest&maxResults=12&langRestrict=en&key=${apiKey}`;

    // const bookUrl = new URL('https://www.googleapis.com/books/v1/volumes?q=+');
    // bookUrl.search = new URLSearchParams({
    //     subject: selectedValue,
    //     orderBy: 'newest',
    //     maxResults: 12,
    //     key: apiKey
    // })

    // console.log(bookUrl);

    fetch(bookUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (jsonResponse) {
            // console.log(jsonResponse)
            const worksData = jsonResponse.items;
            console.log(worksData)
            bookApp.displayBooks(worksData);
        })
}

// adding book data to the page
bookApp.displayBooks = function (dataFromApi) {

    const bookUl = document.querySelector('.bookResults');
    bookUl.innerHTML = '';

    // Book Result Header display and text creation -------
    const bookResultsHeadingContainer = document.querySelector('.headingContainer');
    const bookResultsHeading = document.querySelector('h2');

    bookResultsHeading.innerHTML = '';
    bookResultsHeading.textContent = "here are your book suggestions:";
    bookResultsHeadingContainer.appendChild(bookResultsHeading);

    dataFromApi.forEach(function (bookObject) {
        // List of Books display and text creation --------
        const bookList = document.createElement('li');
        bookList.classList.add('bookListLi');
        const title = document.createElement('h3');
        const author = document.createElement('h4');

        // Add image element when we get book cover data from API
        const image = document.createElement('img');

        // Book Description display and text creation
        const descriptionContainer = document.createElement('div')
        const description = document.createElement('p');
        const googleButton = document.createElement('a');
        descriptionContainer.classList.add('bookDescriptionContainer');
        googleButton.classList.add('googleBookLink');

        title.textContent = bookObject.volumeInfo.title;
        author.textContent = bookObject.volumeInfo.authors;
        description.textContent = bookObject.volumeInfo.description;
        googleButton.textContent = "Learn More"


        // note: this conditional statement returns either 2 authors or 1 and a genre
        // if (bookObject.volumeInfo.authors.length > 1) {
        //     // console.log(bookObject.volumeInfo.authors.length);
        //     author.textContent = `${bookObject.volumeInfo.authors[0]} and ${bookObject.volumeInfo.authors[1]}`
        // } else {
        //     author.textContent = `${bookObject.volumeInfo.authors[0]}`;
        // }

        image.src = bookObject.volumeInfo.imageLinks.smallThumbnail
        image.alt = `${bookObject.volumeInfo.title} cover`
        googleButton.href = bookObject.volumeInfo.infoLink
        googleButton.target = "_blank"

        bookList.appendChild(image);
        bookList.appendChild(title);
        bookList.appendChild(author);
        bookList.appendChild(descriptionContainer)
        bookList.appendChild(googleButton)
        descriptionContainer.appendChild(description);

        bookUl.appendChild(bookList);

        bookList.addEventListener('click', function () {
            bookList.classList.toggle('fullWidth')
            image.classList.toggle('hidden');
            // title.classList.toggle('hidden');
            author.classList.toggle('hidden');
            description.classList.toggle('show');
            googleButton.classList.toggle('show');
            console.log(this)


        })
    })


}

bookApp.init = function () {
    bookApp.getSubject()
}




bookApp.init()