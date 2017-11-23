import React, { Component } from 'react';

const ButtonProduct = ({ onClickShow, product, isActive }) =>
<button id={`btn-${product}`} className={
		  (isActive) ? 'btnProd active' : 'btnProd'} onClick={() => onClickShow()} >
	{product}
</button>;

class ProductItem extends Component {

	constructor(props) {
        super(props)
        this.state = {
            showDescription: false
		}
		this.onClickShow = this.onClickShow.bind(this)
    }// END constructor(props) {

	componentWillMount() {
		this.style = {
			backgroundColor: 'gray'
		}

		this.setState({ showDescription: false })
	}

	componentDidMount() {
		// console.log('componentDidMount() { =========');
		this.setState({ showDescription: false })
    }

	componentWillUpdate(nextProps) {

	}

	shouldComponentUpdate(nextProps) {
		// console.log('shouldComponentUpdate(nextProps) {', nextProps);
		
		return true
	}

	onClickShow() {
        console.log('onClickShow(e) =========');
  
        this.setState({ showDescription: !this.state.showDescription })
    }

	render() {
		const { id, title, categories, description } = this.props
		
		return (
			<div className={'product-item'}>

			<ButtonProduct key={id} onClickShow={this.onClickShow} product={title} isActive={this.state.showDescription} />
				
			{(this.state.showDescription) ? <p className="description">{description}</p> : null}
				
				
			</div>
		)
	}
}

export default ProductItem




