import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsAction } from "../../redux/actions";
import {
	Button,
	Input,
	InputGroup,
	InputGroupAddon,
	InputGroupText,
} from "reactstrap";
import Select from "react-select";
import axios from "axios";
import { accentColor, apiUrl_product } from "../../helpers";
import Paginate from "react-reactstrap-pagination";
import { CardProduct, UserFooter } from "../../components/user";
import { RESET_INITIAL_STATE } from "../../redux/types";

const sortBy = [
	{ value: 1, label: "Default sorting" },
	{ value: 2, label: "Sort by oldest" },
	{ value: 3, label: "Sort by low price" },
	{ value: 4, label: "Sort by high price" },
];

const ProductPage = () => {
	const dispatch = useDispatch();
	const { products } = useSelector((state) => state.productReducer);
	const [minimum, setMinimum] = useState("");
	const [maximum, setMaximum] = useState("");
	const [category, setCategory] = useState(0);
	const [categories, setCategories] = useState([]);
	const [sort, setSort] = useState(1);
	const [keyword, setKeyword] = useState("");
	const [currentPage, setCurrentPage] = useState(0);

	const { wantToChangePass, id } = useSelector((state) => state.authReducer);

	if (wantToChangePass) {
		dispatch({
			type: RESET_INITIAL_STATE,
		});
	}

	useEffect(async () => {
		dispatch(getProductsAction());
		const response = await axios.get(`${apiUrl_product}/categories`);
		setCategories([{ value: 0, label: "All" }, ...response.data]);
	}, []);

	useEffect(() => {
		let query =
			category === 0 ? `sort=${sort}` : `category=${category}&sort=${sort}`;
		dispatch(getProductsAction(query));
	}, [sort, category]);

	const totalItem = products.length;
	const limit = 12;
	const offset = currentPage * limit;

	const renderCard = () => {
		return products.slice(offset, offset + limit).map((value) => {
			return (
				<div
					key={value.id}
					style={{
						width: "24%",
						maxHeight: "24%",
						marginInline: 2,
						marginBottom: 4,
					}}
				>
					<CardProduct
						userId={id}
						id={value.id}
						name={value.name}
						price={value.price}
						stock={value.stock}
						image={value.image[0].imagepath}
					/>
				</div>
			);
		});
	};

	const renderCategory = () => {
		return categories.map((value) => {
			return (
				<div
					key={value.value}
					style={{
						lineHeight: 2.5,
						borderBottom: "1px solid rgba(0,0,0,0.1)",
						cursor: "pointer",
					}}
					onClick={(e) => setCategory(value.value)}
				>
					<div style={{ textTransform: "uppercase" }}>{value.label}</div>
				</div>
			);
		});
	};

	const handlerFilterBtn = () => {
		let query =
			category === 0 ? `sort=${sort}` : `category=${category}&sort=${sort}`;
		if (keyword !== "") {
			const text = keyword.replace(" ", "%20");
			query += `&keyword=${text}`;
		}
		if (maximum !== "" && minimum !== "") {
			query += `&min=${minimum}&max=${maximum}`;
		} else {
			if (minimum !== "") {
				query += `&min=${minimum}`;
			}
			if (maximum !== "") {
				query += `&max=${maximum}`;
			}
		}
		dispatch(getProductsAction(query));
	};

	return (
		<>
			<div style={{ paddingBlock: 50, paddingInline: 200 }}>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						marginBottom: 30,
					}}
				>
					<div>Home / Shop</div>
					<div
						style={{
							width: "50%",
							display: "flex",
							justifyContent: "flex-end",
							alignItems: "center",
						}}
					>
						<div className="mr-4">
							Showing {offset + 1} -{" "}
							{totalItem > 12 ? offset + limit : totalItem} of {totalItem}{" "}
							results
						</div>
						<div style={{ width: "50%" }}>
							<Select
								isSearchable={false}
								options={sortBy}
								defaultValue={{ value: 1, label: "Default sort" }}
								onChange={(e) => setSort(e.value)}
							/>
						</div>
					</div>
				</div>
				<div style={{ display: "flex", justifyContent: "space-between" }}>
					<div
						style={{
							width: "25%",
							minHeight: "500px",
						}}
					>
						<div style={{ marginBottom: 30 }}>
							<InputGroup>
								<Input
									placeholder="search"
									style={{ paddingInline: 20 }}
									onChange={(e) => setKeyword(e.target.value)}
								/>
								<InputGroupAddon addonType="append">
									<InputGroupText
										onClick={handlerFilterBtn}
										style={{
											backgroundColor: accentColor,
											borderWidth: 0,
											cursor: "pointer",
										}}
									>
										<i className="bi bi-search"></i>
									</InputGroupText>
								</InputGroupAddon>
							</InputGroup>
						</div>
						<div style={{ marginBottom: 30 }}>
							<div style={{ marginBottom: 10 }}>
								<div
									style={{
										textTransform: "uppercase",
										fontSize: 18,
										fontWeight: "bold",
									}}
								>
									filter by price
								</div>
							</div>
							<div
								className="d-flex justify-content-end"
								style={{ marginBottom: 20 }}
							>
								<div
									style={{
										backgroundColor: "rgba(0,0,0,0.3)",
										width: "75%",
										height: 3,
									}}
								></div>
							</div>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									marginBottom: 10,
								}}
							>
								<div>
									<Input
										placeholder="min"
										type="number"
										onChange={(e) => setMinimum(e.target.value)}
									/>
								</div>
								<div style={{ marginInline: 10 }}>
									<div>to</div>
								</div>
								<div>
									<Input
										placeholder="max"
										type="number"
										onChange={(e) => setMaximum(e.target.value)}
									/>
								</div>
							</div>
							<div>
								<Button
									onClick={handlerFilterBtn}
									style={{
										width: "100%",
										backgroundColor: accentColor,
										borderWidth: 0,
									}}
								>
									filter
								</Button>
							</div>
						</div>
						<div>
							<div style={{ marginBottom: 10 }}>
								<div
									style={{
										textTransform: "uppercase",
										fontSize: 18,
										fontWeight: "bold",
									}}
								>
									categories
								</div>
							</div>
							<div
								className="d-flex justify-content-end"
								style={{ marginBottom: 20 }}
							>
								<div
									style={{
										backgroundColor: "rgba(0,0,0,0.3)",
										width: "75%",
										height: 3,
									}}
								></div>
							</div>
							<div style={{ marginBottom: 30 }}>{renderCategory()}</div>
						</div>
					</div>
					<div
						style={{
							width: "72%",
						}}
					>
						<div
							style={{
								display: "flex",
								flexWrap: "wrap",
								justifyContent: "flex-end",
								marginBottom: 50,
								minHeight: 580,
							}}
						>
							{renderCard()}
						</div>
						<div style={{ display: "flex", justifyContent: "flex-end" }}>
							{products.length === 0 ? null : (
								<Paginate
									totalItems={totalItem}
									pageSize={limit}
									onSelect={(e) => setCurrentPage(e - 1)}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
			<UserFooter />
		</>
	);
};

export default ProductPage;
