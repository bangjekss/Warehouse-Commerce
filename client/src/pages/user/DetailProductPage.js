import React, { Component } from "react";
import queryString from "querystring";
import { connect } from "react-redux";
import {
	getProductById,
	addToCartAction,
	getProductsAction,
	changeQtyCartAction,
} from "../../redux/actions";
import { Button } from "reactstrap";
import Fade from "react-reveal/Fade";
import { Link, Redirect } from "react-router-dom";
import Swal from "sweetalert2";
import { surfaceColor } from "../../helpers";

class DetailProductPage extends Component {
	state = {
		data: {},
		qtySelected: 1,
		stockMinCart: 0,
	};

	componentDidMount() {
		this.props.getProductsAction();
		const { getProductById } = this.props;
		const product_id = queryString.parse(this.props.location.search)["?id"];
		getProductById(product_id);
	}

	componentDidUpdate(prevProps, prevState) {
		const { data } = this.state;
		const { productById, cart } = this.props;
		if (productById !== prevProps.productById) {
			this.setState({
				data: productById,
			});
		}
		if (prevState.data !== data) {
			const { data } = this.state;
			let result = cart.find((val) => {
				return val.name === data.name;
			});
			if (result) {
				this.setState({
					stockMinCart: productById.stock - result.qty,
				});
			} else {
				this.setState({
					stockMinCart: productById.stock,
				});
			}
		}
	}

	increaseQty = () => {
		this.setState({
			qtySelected: this.state.qtySelected + 1,
		});
	};

	decreaseQty = () => {
		this.setState({
			qtySelected: this.state.qtySelected - 1,
		});
	};

	addToCart = () => {
		const {
			productById,
			userId,
			isLogin,
			addToCartAction,
			changeQtyCartAction,
			cart,
		} = this.props;
		if (!isLogin)
			return Swal.fire({
				title: "You Haven't Signed In Yet!",
				text: `Please Sign In to Buy Something`,
				icon: "warning",
				confirmButtonColor: "#3085d6",
				confirmButtonText: "OK",
			});
		const existProduct = cart.find(
			(value) => value.product_id === productById.id
		);
		if (existProduct) {
			const payload = {
				userId,
				id: existProduct.id,
				qty: existProduct.qty + this.state.qtySelected,
			};
			changeQtyCartAction(payload);
		} else {
			const payload = {
				productId: productById.id,
				qty: this.state.qtySelected,
				userId,
			};
			addToCartAction(payload);
		}
	};

	render() {
		const { stockMinCart } = this.state;
		const {
			id,
			name,
			price,
			imagepath,
			description,
			stock,
			category,
		} = this.props.productById;
		const { cart } = this.props;
		let res = cart.find((val) => {
			return val.name === name;
		});

		return (
			<div className="container">
				<div style={{ height: "50px", marginTop: 30 }}>
					<Link style={{ backgroundColor: "lightgrey" }} to="/">
						Home
					</Link>
					<span style={{ backgroundColor: "lightgrey" }}>/</span>
					<Link style={{ backgroundColor: "lightgrey" }} to="/products">
						Products
					</Link>
					<span style={{ backgroundColor: "lightgrey" }}>/</span>
					<span style={{ backgroundColor: "lightgrey" }}>{category}</span>
					<span style={{ backgroundColor: "lightgrey" }}>/</span>
					<span style={{ backgroundColor: "lightgrey" }}>{name}</span>
				</div>
				<div className="row">
					<div className="col-4">
						<div>
							<Fade left>
								<img
									src={`http://localhost:2000/${imagepath}`}
									alt={`${name}.jpg`}
									height="300px"
									width="300px"
								/>
							</Fade>
						</div>
					</div>
					<div className="col-8">
						<Fade right>
							<div>
								<h1>{name}</h1>
							</div>
							<div>
								<h4>Rp. {price ? price.toLocaleString() : null}</h4>
							</div>
							<div>
								<h4>{category}</h4>
							</div>
							<div>Available: {stock}</div>
							<div style={{ marginTop: 5, marginBottom: 5 }}>{description}</div>
							<div>
								<Button
									color="info"
									onClick={this.decreaseQty}
									disabled={this.state.qtySelected === 1}
								>
									-
								</Button>
								<span className="mx-2">{this.state.qtySelected}</span>
								<Button
									color="info"
									onClick={this.increaseQty}
									disabled={stockMinCart === this.state.qtySelected}
								>
									+
								</Button>
							</div>
							<div style={{ marginTop: 15 }}>
								<Button onClick={this.addToCart} color="info">
									Add to Cart
								</Button>
							</div>
						</Fade>
					</div>
				</div>
			</div>
		);
	}
}

const mapStatetoProps = ({ authReducer, productReducer, cartReducer }) => {
	return {
		productById: productReducer.productById,
		userId: authReducer.id,
		isLogin: authReducer.isLogin,
		cart: cartReducer.cart,
	};
};

export default connect(mapStatetoProps, {
	getProductById,
	addToCartAction,
	getProductsAction,
	changeQtyCartAction,
})(DetailProductPage);
