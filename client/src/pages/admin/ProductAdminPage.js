import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Table } from "reactstrap";
import { apiUrl_admin } from "../../helpers";
import Paginate from "react-reactstrap-pagination";
import {
	addProductByWarehouse,
	deleteProductAction,
	editProductAction,
	getProductsByWarehouse,
} from "../../redux/actions";
import { surfaceColor } from "../../helpers";
import Select from "react-select";

const getBy = [
	{ value: 1, label: "Buah" },
	{ value: 2, label: "Sayur" },
	{ value: 3, label: "Beras dan Tepung" },
	{ value: 4, label: "Susu" },
	{ value: 5, label: "Telur" },
	{ value: 6, label: "Daging" },
];

const ProductAdminPage = () => {
	const dispatch = useDispatch();
	const [ambilWarehouse, setAmbilWarehouse] = useState(0);
	const [fetchWarehouse, setFetchWarehouses] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);
	const [image, setNewImage] = useState(undefined);
	const [newImageName, setNewImageName] = useState("Choose File");
	const [name, setNewName] = useState("");
	const [category_id, setNewCategory] = useState(0);
	const [price, setNewPrice] = useState(0);
	const [stock, setNewStock] = useState(0);
	const [weight, setWeight] = useState(0);
	const [booked_stock, setNewBookedStock] = useState(0);
	const [description, setNewDescription] = useState("");
	const [selected, setSelected] = useState(0);
	const { warehouse } = useSelector((state) => state.adminReducer);

	useEffect(async () => {
		const response = await axios.get(`${apiUrl_admin}/fetchWarehouse`);
		setFetchWarehouses([{ value: 0, label: "" }, ...response.data]);
	}, []);

	useEffect(() => {
		var id = ambilWarehouse;
		dispatch(getProductsByWarehouse(id));
	}, [ambilWarehouse]);

	const totalItem = warehouse.length;
	const limit = 5;
	const offset = currentPage * limit;

	const handleButton = async (value) => {
		await dispatch(
			editProductAction({
				ambilWarehouse,
				id: value.product_id,
				name,
				price,
				category_id,
				description,
				stock,
				booked_stock,
				weight,
				image,
			})
		);
		setNewName("");
		setNewPrice(0);
		setNewCategory(0);
		setNewDescription("");
		setNewStock(0);
		setNewBookedStock(0);
		setWeight(0);
		setSelected(0);
	};

	const handleButton2 = async (value) => {
		setNewName(value.name);
		setNewPrice(value.price);
		setNewCategory(value.category_id);
		setNewDescription(value.description);
		setNewStock(value.stock);
		setNewBookedStock(value.booked_stock);
		setWeight(value.weight);
		setSelected(value.product_id);
	};

	const handleButtonAdd = () => {
		dispatch(
			addProductByWarehouse({
				id: ambilWarehouse,
				name,
				price,
				category_id,
				description,
				stock,
				booked_stock,
				weight,
				image,
			})
		);
		setNewImage(undefined);
		setNewName("");
		setNewPrice(0);
		setNewCategory(0);
		setNewDescription("");
		setNewStock(0);
		setNewBookedStock(0);
		setWeight(0);
		setSelected(0);
	};

	const renderTable = () => {
		return warehouse.slice(offset, offset + limit).map((value, index) => {
			if (selected === value.product_id) {
				return (
					<tr>
						<td>#</td>
						<td>
							<Input
								style={{ fontSize: 12 }}
								id="newImageName"
								name="newImageName"
								value={image}
								type="file"
								defaultValue={image}
								onChange={uploadImg}
								label={newImageName}
							/>
						</td>
						<td>
							<Input
								style={{ fontSize: 12 }}
								id="name"
								name="name"
								value={name}
								defaultValue={value.name}
								placeholder="Name"
								type="text"
								onChange={(e) => setNewName(e.target.value)}
							/>
						</td>
						<td>
							<Select
								style={{ fontSize: 12 }}
								options={getBy}
								value={category_id}
								id="category_id"
								name="category_id"
								defaultValue={{
									value: value.category_id,
									label: value.category,
								}}
								onChange={(e) => setNewCategory(e.value)}
							/>
						</td>
						<td>
							<Input
								value={weight}
								style={{ fontSize: 12 }}
								id="weight"
								name="weight"
								defaultValue={value.weight}
								placeholder="Weight"
								type="number"
								onChange={(e) => setWeight(e.target.value)}
							/>
						</td>
						<td>
							<Input
								value={price}
								style={{ fontSize: 12 }}
								id="price"
								name="price"
								defaultValue={value.price}
								placeholder="Price"
								type="number"
								onChange={(e) => setNewPrice(e.target.value)}
							/>
						</td>
						<td>
							<Input
								value={stock}
								style={{ fontSize: 12 }}
								id="stock"
								name="stock"
								defaultValue={value.stock}
								placeholder="Stock"
								type="number"
								onChange={(e) => setNewStock(e.target.value)}
							/>
						</td>
						<td>
							<Input
								value={booked_stock}
								style={{ fontSize: 12 }}
								id="booked_stock"
								name="booked_stock"
								defaultValue={value.booked_stock}
								placeholder="Booked Stock"
								type="number"
								onChange={(e) => setNewBookedStock(e.target.value)}
							/>
						</td>
						<td>#</td>
						<td>
							<Input
								value={description}
								style={{ fontSize: 12 }}
								id="description"
								name="description"
								defaultValue={value.description}
								placeholder="Description"
								type="text"
								onChange={(e) => setNewDescription(e.target.value)}
							/>
						</td>
						<td>#</td>
						<td>
							<Button
								style={{ backgroundColor: surfaceColor, fontSize: 12 }}
								onClick={() => handleButton(value)}
							>
								Save
							</Button>
						</td>
						<td>
							<Button onClick={() => setSelected(false)}>Cancel</Button>{" "}
						</td>
					</tr>
				);
			} else {
				return (
					<tr key={index}>
						<td>{currentPage > 0 ? index + 1 + currentPage * 5 : index + 1}</td>
						<td>
							<img
								src={`http://localhost:2000/${value.image[0].imagepath}`}
								height="50px"
							/>
						</td>
						<td style={{ fontSize: 14 }}>{value.name}</td>
						<td style={{ fontSize: 14 }}>{value.category}</td>
						<td style={{ fontSize: 14 }}>{value.weight}</td>
						<td style={{ fontSize: 14 }}>Rp.{value.price.toLocaleString()}</td>
						<td style={{ fontSize: 14 }}>{value.stock}</td>
						<td style={{ fontSize: 14 }}>{value.booked_stock}</td>
						<td style={{ fontSize: 14 }}>{value.operationalStock}</td>
						<td style={{ fontSize: 14 }}>{value.description}</td>
						<td style={{ fontSize: 14 }}>
							{value.stock > 0 ? <span>Ready</span> : <span>Out of Stock</span>}
						</td>
						<td>
							<Button color="info" onClick={() => handleButton2(value)}>
								Edit
							</Button>
						</td>
						<td>
							<Button
								color="danger"
								onClick={() =>
									dispatch(
										deleteProductAction(value.product_id, ambilWarehouse)
									)
								}
							>
								Delete
							</Button>
						</td>
					</tr>
				);
			}
		});
	};

	const onChangeCategory = (e) => {
		setAmbilWarehouse(e.value);
	};

	const renderCategory = () => {
		const newArr = fetchWarehouse.map((val) => {
			return { value: val.value, label: val.label };
		});
		return <Select options={newArr} onChange={onChangeCategory} />;
	};

	const uploadImg = (e) => {
		if (e.target.files[0]) {
			setNewImageName(e.target.files[0].name);
			setNewImage(e.target.files[0]);
		}
	};

	return (
		<div
			style={{
				minHeight: "100vh",
				backgroundColor: "teal",
			}}
		>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					marginBottom: 10,
				}}
			>
				<div style={{ width: "400px" }}>{renderCategory()}</div>
				<div className="mr-4">
					Showing {offset + 1} - {totalItem > 5 ? offset + limit : totalItem} of{" "}
					{totalItem} results
				</div>
			</div>
			<div>
				<Table style={{ textAlign: "center" }}>
					<thead>
						<tr>
							<th>No</th>
							<th>Image</th>
							<th>Name</th>
							<th>Category</th>
							<th>Weight</th>
							<th>Price</th>
							<th>Stock</th>
							<th>Paid</th>
							<th>Operational Stock</th>
							<th>Description</th>
							<th>Status</th>
							<th colSpan="2">Action</th>
						</tr>
					</thead>
					<tbody>{renderTable()}</tbody>
					<tfoot>
						<tr>
							<td>#</td>
							<td style={{ fontSize: 12 }}>
								<Input
									id="newImageName"
									name="newImageName"
									placeholder="Image"
									type="file"
									onChange={uploadImg}
									label={newImageName}
								/>
							</td>
							<td>
								<Input
									style={{ fontSize: 12 }}
									id="name"
									name="name"
									placeholder="Name"
									type="text"
									onChange={(e) => setNewName(e.target.value)}
								/>
							</td>
							<td style={{ fontSize: 12 }}>
								<Select
									options={getBy}
									id="category_id"
									name="category_id"
									defaultValue={{ value: 1, label: "Buah" }}
									onChange={(e) => setNewCategory(e.value)}
								/>
							</td>
							<td>
								<Input
									style={{ fontSize: 12 }}
									id="weight"
									name="weight"
									placeholder="Weight"
									type="number"
									onChange={(e) => setWeight(e.target.value)}
								/>
							</td>
							<td>
								<Input
									style={{ fontSize: 12 }}
									id="price"
									name="price"
									placeholder="Price"
									type="number"
									onChange={(e) => setNewPrice(e.target.value)}
								/>
							</td>
							<td>
								<Input
									style={{ fontSize: 12 }}
									id="stock"
									name="stock"
									placeholder="Stock"
									type="number"
									onChange={(e) => setNewStock(e.target.value)}
								/>
							</td>
							<td>
								<Input
									style={{ fontSize: 12 }}
									id="booked_stock"
									name="booked_stock"
									placeholder="Booked Stock"
									type="number"
									onChange={(e) => setNewBookedStock(e.target.value)}
								/>
							</td>
							<td>#</td>
							<td>
								<Input
									style={{ fontSize: 12 }}
									id="description"
									name="description"
									placeholder="Description"
									type="text"
									onChange={(e) => setNewDescription(e.target.value)}
								/>
							</td>
							<td>#</td>
							<td colSpan="2">
								<Button
									style={{ backgroundColor: surfaceColor, fontSize: 12 }}
									onClick={handleButtonAdd}
								>
									Add
								</Button>
							</td>
						</tr>
					</tfoot>
				</Table>
				<div style={{ display: "flex", justifyContent: "flex-end" }}>
					{warehouse.length === 0 ? null : (
						<Paginate
							totalItems={totalItem}
							pageSize={limit}
							onSelect={(e) => setCurrentPage(e - 1)}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProductAdminPage;
