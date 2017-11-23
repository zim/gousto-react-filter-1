import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import ProductItem from './ProductItem'
import ajax from 'superagent'
import NavLink from './NavLink'

// import FaHome from 'react-icons/lib/fa/home'


class ProductList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            categoriesmode: '',
            categoryChoice: 'All Products',
            products: [],
            filteredProducts: [],
            inputValue: ''
        }
        this.filterList = this.filterList.bind(this)
        this.filterCategory = this.filterCategory.bind(this)
        this.myFunction = this.myFunction.bind(this)
    }// END constructor(props) {

    fetchFeedUrl(url, categories) {
        ajax.get(url)
            .end((error, response) => {
                if (!error && response) {
                    // console.log('fetchFeedUrl(url) { RESPONSE =', response.body)
                    this.setState({ [categories]: response.body.data });
                } else {
                    console.log(`Error fetching `, error);
                }
            }
            );
    }// END fetchFeedUrl(url, categories) {

    componentWillMount() {
        this.fetchFeedUrl('https://api.gousto.co.uk/products/v2.0/categories', 'categories');
        this.fetchFeedUrl('https://api.gousto.co.uk/products/v2.0/products?includes[]=categories&includes[]=attributes&sort=position&image_sizes[]=365&image_sizes[]=400&period_id=120', 'products');

        

    }// END componentDidMount() {

    componentWillUpdate(nextProps) {
        // console.log('componentWillUpdate(nextProps) { =========');

        // console.log(nextProps);
        // console.log(nextProps.params);
        // console.log(nextProps.params);

        // this.setCategory(nextProps.params)

        // this.filterCategory(category.title)
        console.log(this.state.categories)

        console.log({id: "all products", title: "All Products", box_limit: 7, is_default: false, recently_added: false})

        

        //this.setState({categories})
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log('componentDidUpdate(prevProps) {');
        // console.log(prevProps);
        // console.log(prevState);

    }

    componentWillReceiveProps(prevProps, prevState) {

        console.log(prevProps)
        console.log(prevState)

        let categoryChoice = prevProps.params
        categoryChoice = Object.values(categoryChoice)

        categoryChoice = categoryChoice.toString()

        console.log(categoryChoice)

        if (categoryChoice !== this.state.categoryChoice) {
            this.setState({ categoryChoice: categoryChoice, inputValue: '' });
        }

        let categories = [
            ...this.state.categories,
            {id: "all products", title: "All Products", box_limit: 7, is_default: false, recently_added: false}
        ]
        console.log(categories)

        if (categories !== this.state.categories) {
            console.log('sheeeeeeeeet')
            console.log(categories)
            console.log(this.state.categories)

            this.setState({categories})
        }

    }

    componentDidMount() {
        // console.log('componentDidMount() { ========= XXXXXXXXX');
    }


    myFunction(item, index, arr) {


        // console.log('item.title')
        // console.log(item.title)
        // console.log(item.title.toLowerCase())
        // console.log('inputValue inputValue inputValue ==== ', this.state.inputValue)

        return item.title.toLowerCase().search(
            this.state.inputValue) !== -1;
    }




    filterList(event, arrayCat) {
        // console.dir(event)
        // console.log('filterList(event){ === ', arrayCat)
        var updatedList = arrayCat;
        // console.log('updatedList === ', updatedList)
        // console.log(Array.isArray(updatedList))

        this.setState({ inputValue: event.value });


        this.setState({ inputValue: event.value }, function () {
            // console.log('zcxvzxvzxvzxvzxvzxvzxvxzv = ',this.state.inputValue);
            updatedList = updatedList.filter(this.myFunction);
            // console.log('updatedList ==dddddd= ', updatedList)
            this.setState({ filteredProducts: updatedList });
        });

        // console.log('this.state.inputValue =kkk',this.state.inputValue)

        // updatedList.forEach(this.myFunction)
        // updatedList = updatedList.filter(this.myFunction);
        // console.log('updatedList ==dddddd= ', updatedList)
        // this.setState({filteredProducts: updatedList});



        // let startsWith = wordToCompare => (element, index, array) => {
        //     return element.indexOf(wordToCompare) === 0;
        //   }

        // where word would be your argument
        //   let result = updatedList.filter(startsWith(word));

    }// END filterList(event, arrayCat) {

    filterCategory(event) {


        this.setState({ categoryChoice: event, inputValue: '', filteredProducts: [] });
    }

    appHandleSubmit(message) {
        this.setState({ inputValue: message });
    }




    // let filteredArrayCat = this.state.products.filter(function (product, index, array) {

    //                     return product.categories.some(function (category, index, array) {
    //                         return category.title === categoryChoice;
    //                     });

    //                 }
    //             );

    render() {
        const { categories, products, filterList, filterCategory, filteredProducts, categoryChoice, inputValue } = this.state

        let filteredArrayCat;

        if (categoryChoice == "All Products") {
            console.log('TRUUUUUUUUE')
            filteredArrayCat = this.state.products;
        } else {
            filteredArrayCat = this.state.products.filter(function (product, index, array) {

                return product.categories.some(function (category, index, array) {
                    return category.title === categoryChoice;
                });

            }
            );
        }



        // console.log('category =vvvvvvv== ', categoryChoice)
        // console.log('filteredArrayCat === ', filteredArrayCat)

        return (
            <div className="product-list">
                <h1>Product List</h1>

                <nav>
                    {this.state.categories.map((category, index) => {

                        return (

                            <NavLink key={category.id} category={category.title} to={`/productlist/` + category.title} onClick={() => this.filterCategory(category.title)} onChange={() => this.filterCategory(category.title)} onlyActiveOnIndex className={
                                (categoryChoice === category.title) ? 'btnCat active' : 'btnCat'}>{category.title}</NavLink>


                        );
                    })}
                    
                </nav>

                <h2>Current Selection: {this.state.categoryChoice}</h2>

                <input name="inputSearch" type="text" value={inputValue} placeholder="Search" onChange={(event) => this.filterList(event.target, filteredArrayCat)} />

                {(inputValue.length) ?
                    filteredProducts.map(
                        (product, index) => {

                            return (

                                <ProductItem
                                    key={product.id}
                                    id={product.id}
                                    title={product.title}
                                    categories={product.categories}
                                    description={product.description}
                                    showdescription={false}
                                />

                            );

                        }) : filteredArrayCat.map(
                            (product, index) => {

                                return (

                                    <ProductItem
                                        key={product.id}
                                        id={product.id}
                                        title={product.title}
                                        categories={product.categories}
                                        description={product.description}
                                        showdescription={false}
                                    />

                                );

                            })
                }

            </div>
        )
    }// END render() {
}

export default ProductList;