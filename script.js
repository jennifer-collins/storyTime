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