import { Drawer, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "reactstrap";
import { LoaderPage } from "../../components";
import { UserFooter } from "../../components/user";
import { accentColor, primaryColor } from "../../helpers";
import {
	changeMainAddressAction,
	currentAddressAction,
	nearestWarehouseAction,
	postTransaction,
	updateCartQty,
} from "../../redux/actions";
import Loader from "react-loader-spinner";
import { Link, Redirect } from "react-router-dom";

const CheckoutPage = () => {
	const styles = useStyles();
	const dispatch = useDispatch();
	const { id, address, username, isLogin } = useSelector(
		(state) => state.authReducer
	);
	const { cart } = useSelector((state) => state.cartReducer);
	const mainAddress = address.find((value) => value.is_main === 1);
	const { courier, nearestWarehouse, isLoading, isSuccess } = useSelector(
		(state) => state.transactionReducer
	);

	const [openShipping, setOpenShipping] = useState(false);
	const [openPayment, setOpenPayment] = useState(false);
	const [openAddress, setOpenAddress] = useState(false);
	const [localUsername, setLocalUsername] = useState(username);
	const [localLabel, setLocalLabel] = useState(null);
	const [localPhone, setLocalPhone] = useState(null);
	const [localAddress, setLocalAddress] = useState(null);
	const [localCity, setLocalCity] = useState(null);
	const [localSubdistrict, setLocalSubdistrict] = useState(null);
	const [cityId, setCityId] = useState(null);
	const [shippingInformation, setShippingInformation] = useState(null);
	// const [warehouse, setWarehouse] = useState([]);

	useEffect(async () => {
		// const getWarehouse = await axios.get(`${apiUrl_transaction}/warehouse`);
		// setWarehouse(getWarehouse.data);
		if (localStorage.getItem("current_address")) {
			const current_address = JSON.parse(
				localStorage.getItem("current_address")
			);
			setLocalUsername(username);
			setLocalAddress(current_address.alamat_lengkap);
			setLocalCity(current_address.kota);
			setLocalSubdistrict(current_address.kecamatan);
			setLocalLabel(current_address.label);
			setLocalPhone(current_address.phone);
			setCityId(current_address.city_id);
		}
	}, []);

	useEffect(() => {
		if (!isLoading && username) {
			if (localStorage.getItem("current_address")) {
				const current_address = JSON.parse(
					localStorage.getItem("current_address")
				);
				setLocalUsername(username);
				setLocalAddress(current_address.alamat_lengkap);
				setLocalCity(current_address.kota);
				setLocalSubdistrict(current_address.kecamatan);
				setLocalLabel(current_address.label);
				setLocalPhone(current_address.phone);
				setCityId(current_address.city_id);
			} else {
				setLocalUsername(username);
				setLocalAddress(mainAddress.alamat_lengkap);
				setLocalCity(mainAddress.kota);
				setLocalSubdistrict(mainAddress.kecamatan);
				setLocalLabel(mainAddress.label);
				setLocalPhone(mainAddress.phone);
				setCityId(mainAddress.city_id);
			}
		}
	}, [address]);

	useEffect(() => {
		let weight = 0;
		cart.forEach((value) => (weight += value.weight * value.qty));
		if (localCity && localSubdistrict && cityId) {
			const payload = {
				weight,
				city: localCity,
				subDistrict: localSubdistrict,
				cityId,
			};
			dispatch(nearestWarehouseAction(payload));
		}
	}, [dispatch, openShipping]);

	const handleSetToMainAddressBtn = (mainAfterId) => {
		const payload = {
			mainBeforeId: mainAddress.id,
			mainAfterId,
		};
		dispatch(changeMainAddressAction(payload));
	};

	const handleSelectBtn = (value) => {
		dispatch(currentAddressAction(value));
		const current_address = JSON.parse(localStorage.getItem("current_address"));
		setLocalUsername(username);
		setLocalAddress(current_address.alamat_lengkap);
		setLocalCity(current_address.kota);
		setLocalSubdistrict(current_address.kecamatan);
		setLocalLabel(current_address.label);
		setLocalPhone(current_address.phone);
	};
	const handleOngkirBtn = (payload) => {
		setShippingInformation(payload);
		setOpenShipping(false);
	};

	if (!isLogin) return <Redirect to="/login" />;
	if (isLoading) return <LoaderPage />;

	if (isSuccess)
		return (
			<div>
				<div
					className="d-flex align-items-center justify-content-center"
					style={{ backgroundColor: primaryColor, minHeight: "100vh" }}
				>
					<div>
						<div>
							<img
								src="https://www.pikpng.com/pngl/b/59-597243_thank-you-for-coming-png-calligraphy-clipart.png"
								alt="file_err"
								style={{ width: "500px" }}
							/>
						</div>
						<div className="d-flex justify-content-center mt-5">
							<Button className={styles.primaryBtn} style={{ marginInline: 5 }}>
								<Link to="/">
									<div className={styles.primaryBtnChild}>Home</div>
								</Link>
							</Button>
							<Button className={styles.primaryBtn} style={{ marginInline: 5 }}>
								<Link to="/profile">
									<div className={styles.primaryBtnChild}>Transaction</div>
								</Link>
							</Button>
						</div>
					</div>
				</div>
				<UserFooter />
			</div>
		);

	const renderList = () => {
		return cart.map((value) => {
			return (
				<div>
					<div style={{ display: "flex" }} key={value.id}>
						<div
							style={{
								width: "15%",
								maxHeight: 100,
								maxWidth: 100,
								backgroundColor: accentColor,
								borderRadius: 5,
							}}
						>
							<img
								src={
									value.imagepath
										? value.imagepath
										: "https://www.grinvirobiotekno.com/images/product/No-image-available.jpg"
								}
								alt={value.imagepath}
								style={{
									backgroundColor: accentColor,
									borderRadius: 5,
									objectFit: "contain",
									height: 100,
									maxHeight: 100,
									width: 100,
									maxWidth: 100,
								}}
							/>
						</div>
						<div
							style={{
								width: "85%",
								paddingLeft: 20,
								display: "flex",
								justifyContent: "space-between",
							}}
						>
							<div style={{ width: "80%" }}>
								<div>{value.name}</div>
								<div>1 item ({value.weight} gr)</div>
								<div>
									Rp{value.price.toLocaleString()} x {value.qty}
								</div>
							</div>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									width: "20%",
									justifyContent: "flex-end",
								}}
							>
								<Button
									style={{ paddingInline: 5, paddingBlock: 0 }}
									className={styles.primaryBtn}
									onClick={() =>
										dispatch(
											updateCartQty({
												userId: id,
												cartId: value.id,
												qty: value.qty - 1,
											})
										)
									}
								>
									<div className={styles.primaryBtnChild}>-</div>
								</Button>
								<div className="mx-2">
									<div>{value.qty}</div>
								</div>
								<Button
									style={{ paddingInline: 5, paddingBlock: 0 }}
									className={styles.primaryBtn}
									onClick={() =>
										dispatch(
											updateCartQty({
												userId: id,
												cartId: value.id,
												qty: value.qty + 1,
											})
										)
									}
								>
									<div className={styles.primaryBtnChild}>+</div>
								</Button>
							</div>
						</div>
					</div>
					<div className={styles.divider}></div>
				</div>
			);
		});
	};

	const renderAddress = () => {
		return address.map((value) => {
			return (
				<div
					key={value.id}
					style={{
						borderRadius: 10,
						boxShadow: "0 0 5px 0 rgba(0,0,0,0.3)",
						marginBottom: 5,
						paddingInline: 20,
						paddingBlock: 10,
						backgroundColor: primaryColor,
					}}
				>
					<div style={{ marginBottom: 10 }}>
						<div>
							{value.is_main === 1 ? (
								<div
									style={{ display: "flex", justifyContent: "space-between" }}
								>
									<div>
										<span>{username}</span>
										<span>({value.label})</span>
									</div>
									<div
										style={{
											fontSize: 8,
											boxShadow: "0 0 5px 0 rgba(0,0,0,0.15)",
											fontWeight: 600,
											borderRadius: 5,
											paddingInline: 5,
											border: "1px solid rgba(240, 165, 0)",
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
										}}
									>
										<div>primary</div>
									</div>
								</div>
							) : (
								<div>
									<span>{username}</span>
									<span>({value.label})</span>
								</div>
							)}
						</div>
						<div>{value.phone}</div>
						<div>{value.alamat_lengkap}</div>
					</div>
					<div>
						{value.alamat_lengkap === localAddress ? (
							<div>
								<Button className={styles.primaryBtn}>
									<div className={styles.primaryBtnChild}>selected</div>
								</Button>
							</div>
						) : (
							<div>
								<Button
									className={styles.whiteBtn}
									style={{ marginRight: 5 }}
									onClick={(e) => handleSelectBtn(value)}
								>
									<div className={styles.whiteBtnChild}>select</div>
								</Button>
								{value.is_main === 1 ? null : (
									<Button
										disabled={isLoading}
										className={styles.whiteBtn}
										onClick={(e) => handleSetToMainAddressBtn(value.id)}
									>
										<div className={styles.whiteBtnChild}>
											set to main address
										</div>
									</Button>
								)}
							</div>
						)}
					</div>
				</div>
			);
		});
	};

	const renderCourier = () => {
		let courierLogo;
		if (Object.keys(courier).length !== 0) {
			if (isLoading) return <Loader type="TailSpin" />;
			return courier.results.map((value, index) => {
				if (value.code === "jne")
					courierLogo = "https://i.imgur.com/jPd0DaH.png";
				if (value.code === "pos")
					courierLogo = "https://i.imgur.com/yJ7HlFZ.png";
				if (value.code === "tiki")
					courierLogo = "https://i.imgur.com/amM6lgA.png";
				return (
					<div key={index} style={{}}>
						<div style={{ marginBottom: 0 }}>
							<div>
								<div
									style={{
										display: "flex",
										justifyContent: "space-between",
									}}
								>
									<div
										style={{
											paddingInline: 5,
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
											width: "30%",
										}}
									>
										<img
											src={courierLogo}
											alt="file_err"
											style={{ height: 50, width: 100, objectFit: "contain" }}
										/>
									</div>
									<div
										style={{
											width: "65%",
											display: "flex",
											flexDirection: "column",
										}}
									>
										{value.costs.map((item) => {
											return (
												<Button
													className={styles.whiteBtn}
													style={{ marginBlock: 2 }}
													onClick={() =>
														handleOngkirBtn({
															courier: value.code,
															service: item.service,
															description: item.description,
															cost: item.cost[0].value,
															etd: item.cost[0].etd,
														})
													}
												>
													<div className={styles.whiteBtnChild}>
														<div>
															<span style={{ textTransform: "uppercase" }}>
																{value.code}
															</span>
															<span>{" - "}</span>
															<span>{item.service}</span>
														</div>
														<div>{item.cost[0].value.toLocaleString()}</div>
														<div>estimasi {item.cost[0].etd} hari</div>
													</div>
												</Button>
											);
										})}
									</div>
								</div>
							</div>
							<div className={styles.divider}></div>
						</div>
					</div>
				);
			});
		}
		return null;
	};

	const renderSubTotal = () => {
		let subTotal = 0;
		cart.forEach((value) => {
			subTotal += value.price * value.qty;
		});
		return subTotal;
	};

	const renderTotalWeight = () => {
		let weight = 0;
		let qty = 0;
		cart.forEach((value) => {
			weight += value.weight * value.qty;
			qty += value.qty;
		});
		return `${weight.toLocaleString()} gr / ${qty} items`;
	};

	const renderBilling = () => {
		let bill = 0;
		if (shippingInformation) {
			bill += renderSubTotal() + shippingInformation.cost;
		} else {
			bill += renderSubTotal();
		}
		return bill;
	};

	const handleProcessBtn = () => {
		const payload = {
			shipping: {
				name: localUsername,
				phone: localPhone,
				address: localAddress,
				courier: shippingInformation,
			},
			userId: id,
			amount: renderBilling(),
			nearestWarehouse,
			paymentMethodId: 1,
			cartItems: cart,
		};
		console.log(payload);
		dispatch(postTransaction(payload));
	};

	const toggleDrawerAddress = (event, isOpen) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}
		setOpenAddress(isOpen);
	};

	const toggleDrawerShipping = (event, isOpen) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}
		setOpenShipping(isOpen);
	};

	const toggleDrawerPayment = (event, isOpen) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}
		setOpenPayment(isOpen);
	};

	return (
		<div>
			<div
				style={{
					paddingInline: 250,
					paddingBlock: 50,
					backgroundColor: primaryColor,
				}}
			>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						marginBottom: 30,
					}}
				>
					<div style={{ fontSize: 20, color: "gray" }}>
						<Link to="/cart" className={styles.link}>
							Your Cart
						</Link>
						<span className="mx-4">{">"}</span>
						<span>
							<b>Checkout</b>
						</span>
						<span className="mx-4">{">"}</span>
						<span>Process</span>
					</div>
				</div>
				<div style={{ display: "flex", justifyContent: "space-between" }}>
					<div style={{ width: "65%", backgroundColor: "rgba(0,0,0,0.1)" }}>
						<div
							style={{
								backgroundColor: primaryColor,
								marginBottom: 5,
								paddingBlock: 15,
							}}
						>
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									marginBottom: 20,
								}}
							>
								<div
									style={{
										fontSize: 18,
										fontWeight: "bold",
										textTransform: "uppercase",
									}}
								>
									billing & shipping
								</div>
							</div>
							<div>
								<div style={{ fontWeight: "bold" }}>Shipping Address</div>
								<div className={styles.divider}></div>

								{localAddress === "" ? (
									<Loader type="ThreeDots" />
								) : !localAddress ? (
									<Button className={styles.whiteBtn}>
										<div className={styles.whiteBtnChild}>Add Address</div>
									</Button>
								) : (
									<div>
										<div
											className={styles.smallText}
											style={{ fontWeight: "bold" }}
										>
											{localUsername} (
											<span style={{ fontWeight: 600 }}>{localLabel}</span>)
										</div>
										<div className={styles.smallText}>{localPhone}</div>
										<div className={styles.smallText}>{localAddress}</div>
									</div>
								)}

								<div className={styles.divider}></div>
								<div style={{ display: "flex" }}>
									<Button
										className={styles.whiteBtn}
										onClick={(e) => toggleDrawerAddress(e, true)}
									>
										<div className={styles.whiteBtnChildChangeAddress}>
											change address
										</div>
									</Button>
									<Drawer
										anchor="right"
										open={openAddress}
										onClose={(e) => toggleDrawerAddress(e, false)}
									>
										<div
											style={{
												width: "400px",
											}}
										>
											<div
												style={{
													backgroundColor: primaryColor,
													display: "flex",
													justifyContent: "center",
													paddingBlock: 20,
													boxShadow: "0 0 10px 1px rgba(0,0,0,0.3)",
													fontWeight: 600,
													fontSize: 18,
													// marginBottom: 100,
												}}
											>
												<div>Change Address</div>
											</div>
											<div style={{ padding: 20 }}>{renderAddress()}</div>
											<div style={{ paddingTop: 32 }}>
												<div
													style={{
														position: "fixed",
														bottom: 0,
														width: "400px",
														backgroundColor: "red",
														color: "white",
														textAlign: "center",
													}}
												>
													<Button
														className={styles.primaryBtn}
														style={{ width: "100%", borderRadius: 0 }}
													>
														<div className={styles.primaryBtnChild}>
															+ Add New Address
														</div>
													</Button>
												</div>
											</div>
										</div>
									</Drawer>
								</div>
							</div>
						</div>
						<div style={{ backgroundColor: primaryColor, paddingBlock: 15 }}>
							<div>
								<div style={{ fontWeight: "bold" }}>Your Order</div>
								<div className={styles.divider}></div>
								<div>{renderList()}</div>
								<div
									style={{
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
									}}
								>
									<div>
										<div style={{ fontWeight: 600 }}>Subtotal</div>
										<div style={{ fontSize: 13, paddingLeft: 20 }}>
											{renderTotalWeight()}
										</div>
									</div>
									<div>
										<div style={{ fontSize: 20, fontWeight: 600 }}>
											Rp{renderSubTotal().toLocaleString()}
										</div>
									</div>
								</div>
							</div>
						</div>
						<div
							style={{
								width: "100%",
								height: 5,
								backgroundColor: "rgba(0,0,0,0.1)",
							}}
						></div>
					</div>
					<div
						style={{
							width: "30%",
							backgroundColor: "rgba(0,0,0,0.1)",
							boxShadow: "0 0 5px 0 rgba(0,0,0,0.15)",
							borderRadius: 10,
							height: "100%",
							position: "sticky",
							top: 50,
						}}
					>
						<div
							style={{
								backgroundColor: primaryColor,
								marginBottom: 5,
								padding: 20,
								borderTopLeftRadius: 10,
								borderTopRightRadius: 10,
							}}
						>
							<div style={{ marginBottom: 5 }}>
								<Button
									style={{ width: "100%" }}
									className={styles.whiteBtn2}
									onClick={(e) => toggleDrawerShipping(e, true)}
								>
									<div className={styles.whiteBtnChild}>Shipping</div>
								</Button>
								<Drawer
									anchor="right"
									open={openShipping}
									onClose={(e) => toggleDrawerShipping(e, false)}
								>
									{isLoading ? (
										<Loader type="Plane" />
									) : (
										<div
											style={{
												width: "400px",
											}}
										>
											<div
												style={{
													backgroundColor: primaryColor,
													display: "flex",
													justifyContent: "center",
													paddingBlock: 20,
													boxShadow: "0 0 10px 1px rgba(0,0,0,0.3)",
													fontWeight: 600,
													fontSize: 18,
													marginBottom: 20,
												}}
											>
												<div>Shipping</div>
											</div>
											<div style={{ padding: 0 }}>{renderCourier()}</div>
										</div>
									)}
								</Drawer>
							</div>
							<div>
								<Button
									disabled={true}
									style={{ width: "100%" }}
									className={styles.whiteBtn2}
									onClick={(e) => toggleDrawerPayment(e, true)}
								>
									<div className={styles.whiteBtnChild}>Payment Method</div>
									<div className={styles.whiteBtnChild}>Transfer Bank</div>
								</Button>
							</div>
						</div>
						<div
							style={{
								backgroundColor: primaryColor,
								padding: 20,
								borderBottomLeftRadius: 10,
								borderBottomRightRadius: 10,
							}}
						>
							<div style={{ fontWeight: 600, marginBottom: 10 }}>Shopping</div>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									lineHeight: 1.7,
									fontSize: 14,
								}}
							>
								<div>total price</div>
								<div>Rp{renderSubTotal().toLocaleString()}</div>
							</div>
							<div>
								{shippingInformation ? (
									<div
										style={{
											display: "flex",
											justifyContent: "space-between",
											lineHeight: 1.7,
											fontSize: 14,
										}}
									>
										<div>shipping cost</div>
										<div>Rp{shippingInformation.cost.toLocaleString()}</div>
									</div>
								) : null}
							</div>
							<div className={styles.divider}></div>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
									marginBottom: 30,
								}}
							>
								<div style={{ fontSize: 18, fontWeight: 600 }}>Billing</div>
								<div
									style={{
										fontSize: 18,
										fontWeight: 600,
										color: "rgba(250, 89, 29)",
									}}
								>
									Rp{renderBilling().toLocaleString()}
								</div>
							</div>
							<div>
								<Button
									style={{ width: "100%" }}
									className={styles.primaryBtn}
									onClick={handleProcessBtn}
								>
									<div className={styles.primaryBtnChild}>Process</div>
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<UserFooter />
		</div>
	);
};

const useStyles = makeStyles({
	divider: {
		height: 1,
		width: "100%",
		backgroundColor: "rgba(0,0,0,0.3)",
		marginBlock: 15,
	},
	smallText: {
		fontSize: 13,
	},
	whiteBtn: {
		backgroundColor: primaryColor,
		borderWidth: 1,
		borderColor: "rgba(0,0,0,0.15)",
		boxShadow: "0 0 5px 0px rgba(0,0,0,0.1)",
	},
	whiteBtn2: {
		paddingBlock: 10,
		backgroundColor: primaryColor,
		borderWidth: 1,
		borderColor: "rgba(0,0,0,0.15)",
		boxShadow: "0 0 5px 0px rgba(0,0,0,0.1)",
	},
	primaryBtn: {
		paddingBlock: 10,
		backgroundColor: accentColor,
		borderWidth: 0,
		// borderColor: "rgba(0,0,0,0.15)",
		boxShadow: "0 0 5px 0px rgba(0,0,0,0.2)",
	},
	whiteBtnChildChangeAddress: {
		textTransform: "",
		color: "black",
		fontSize: 13,
		fontWeight: 600,
	},
	whiteBtnChild: {
		textTransform: "",
		color: "black",
		fontSize: 14,
		fontWeight: 600,
	},
	primaryBtnChild: {
		textTransform: "",
		color: "black",
		fontSize: 14,
		fontWeight: 600,
	},
	link: {
		color: "gray",
		"&:hover": {
			textDecoration: "none",
		},
	},
});

export default CheckoutPage;
