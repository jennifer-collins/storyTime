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

// Namespace for App
const bookApp = {};

const form = document.querySelector('form');

bookApp.getSubject = function () {
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        bookApp.getBooks();

    })
}
// store the api call info



// getting data from api
bookApp.getBooks = function () {
    // create our url endpoint

    const selection = document.querySelector('#bookSubject');
    let selectedValue = selection.value
    const apiKey = 'AIzaSyBt9dJvG6Epw3nwxoLVa_AU_4CzUGOdWzc'

    // const eraSelection = document.querySelector('#era');
    // let selectedEra = eraSelection.value
    // // console.log(selectedEra)

    // console.log(selectedValue)

    // const sortSelection = document.querySelector('#sort')
    // let selectedSort = sortSelection.value

    
    const bookUrl = `https://www.googleapis.com/books/v1/volumes?q=+subject:${selectedValue}&orderBy=newest&maxResults=12&key=${apiKey}`;
    
    // const bookUrl = new URL('https://www.googleapis.com/books/v1/volumes?q=+');
    // bookUrl.search = new URLSearchParams({
    //     subject: selectedValue,
    //     orderBy: 'newest',
    //     maxResults: 12,
    //     key: apiKey
    // })


    console.log(bookUrl);


    fetch(bookUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (jsonResponse) {
            console.log(jsonResponse)
            // console.log(`Here are your recommendations for books about ${selectedValue}:`);
            // for (let i = 0; i < jsonResponse.works.length; i++) {
            //     console.log(`${jsonResponse.works[i].title} by ${jsonResponse.works[i].authors[0].name}`)

            // }
            const worksData = jsonResponse.items;
            // console.log(worksData)
            bookApp.displayBooks(worksData);



        })
}
// adding book data to the page
bookApp.displayBooks = function (dataFromApi) {

    const bookUl = document.querySelector('.bookResults');
    bookUl.innerHTML = '';
    dataFromApi.forEach(function (bookObject) {
        const bookList = document.createElement('li');
        bookList.classList.add('bookListLi');
        const title = document.createElement('h2');
        const author = document.createElement('p');

        // Add image element when we get book cover data from API
        const image = document.createElement('img');

        title.textContent = bookObject.volumeInfo.title;
        author.textContent = bookObject.volumeInfo.authors;

        // note: this conditional statement returns either 2 authors or 1 and a genre
        // if (bookObject.volumeInfo.authors.length > 1) {
        //     // console.log(bookObject.volumeInfo.authors.length);
        //     author.textContent = `${bookObject.volumeInfo.authors[0]} and ${bookObject.volumeInfo.authors[1]}`
        // } else {
        //     author.textContent = `${bookObject.volumeInfo.authors[0]}`;
        // }

        // const idNumber = bookObject.cover_id;
        // note: we need to make the id number dynamic
        // const coverUrl = `https://covers.openlibrary.org/b/id/${idNumber}.jpg`
        image.src = bookObject.volumeInfo.imageLinks.smallThumbnail
        image.alt = `${bookObject.volumeInfo.title} cover`
        // console.log(image.src);

        // author.textContent = `${jsonResponse.works[i].authors[0].name}`;

        bookList.appendChild(image);
        bookList.appendChild(title);
        bookList.appendChild(author);
        bookUl.appendChild(bookList);
    })
}

bookApp.init = function () {
    bookApp.getSubject()
}




bookApp.init()