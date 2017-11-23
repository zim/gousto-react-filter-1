# GOUSTO FRONTEND API TEST

Navigated to the folder 'gousto-react-filter-app' in the terminal.

Run 'npm install'

Run 'npm start'

navigate to http://localhost:8080/ in a browseer...

How to use your solution:

On initial page load all categories are displayed in a navigation area at the top the the page as category nav links, and all products are displayed in the product list below as button elements at the bottom the the page.

There is also an input field, placed below the navigation area and above the product list. The input field is a free text search filter for products. Once input is entered only products which feature the given text in their title are shown.

Once a category link is clicked only products belonging to the clicked category will be shown and the clicked category is shown as bold to indicate it is active.

The App is using react-router which allows the user to navigates with the back and forward button, the previously selected category will be shown etc.

When a product element name is clicked it becomes bold and toggles the visibility of the description, ie. when clicked it shows the product description below the product name. When clicked again the description is removed. Multiple descriptions can be shown at the same time.




Explain how your solution uses the components you built:

The App is using the 2 provided API endpoints to fetch the Category and Products data via ajax and set the various state values of the ProductList.

this.state = {
            categories: [],
            categoriesmode: '',
            categoryChoice: 'All Products',
            products: [],
            filteredProducts: [],
            inputValue: ''
        }

This One Page Web App uses React to filter products depending on their category.

The App uses react-router to display relevant products according to the category that is passed to the ProductList component via params set in url route.

The ProductList component uses the ProducItem component to display the items.

Creating a ProductItem component makes it easy to set and pass product items variables via props to the components, also helping us to show and hide the products description by changing the component display state on click event of ProductItem component.








Anything else you think is relevant to your solution 

