import React, { Component } from 'react';
import ProductItem from './ProductItem'
import ajax from 'superagent'
import NavLink from './NavLink'

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

    }

    componentDidUpdate(prevProps, prevState) {
    }

    componentWillReceiveProps(prevProps, prevState) {

        let categoryChoice = prevProps.params
        categoryChoice = Object.values(categoryChoice)
        categoryChoice = categoryChoice.toString()

        if (categoryChoice !== this.state.categoryChoice) {
            this.setState({ categoryChoice: categoryChoice, inputValue: '' });
        }

        let categories = [
            ...this.state.categories,
            { id: "all products", title: "All Products", box_limit: 7, is_default: false, recently_added: false }
        ]

        if (categories !== this.state.categories) {
            this.setState({ categories })
        }

    }

    componentDidMount() {
    }


    myFunction(item, index, arr) {
        return item.title.toLowerCase().search(
            this.state.inputValue) !== -1;
    }




    filterList(event, arrayCat) {
        var updatedList = arrayCat;

        this.setState({ inputValue: event.value });

        this.setState({ inputValue: event.value }, function () {
            updatedList = updatedList.filter(this.myFunction);
            this.setState({ filteredProducts: updatedList });
        });

    }// END filterList(event, arrayCat) {

    filterCategory(event) {
        this.setState({ categoryChoice: event, inputValue: '', filteredProducts: [] });
    }

    appHandleSubmit(message) {
        this.setState({ inputValue: message });
    }

    render() {
        const { categories, products, filterList, filterCategory, filteredProducts, categoryChoice, inputValue } = this.state

        let filteredArrayCat;

        if (categoryChoice == "All Products") {
            filteredArrayCat = this.state.products;
        } else {
            filteredArrayCat = this.state.products.filter(function (product, index, array) {

                return product.categories.some(function (category, index, array) {
                    return category.title === categoryChoice;
                });

            }
            );
        }

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