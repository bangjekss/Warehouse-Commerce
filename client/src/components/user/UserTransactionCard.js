import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	addToCartAction,
	changeQtyCartAction,
	postPaymentBill,
	barangSampai,
	cancelTransaction,
} from "../../redux/actions";

const UserTransactionCard = ({ data, lihatItem, review }) => {
	const { transactionData } = useSelector((state) => state.transactionReducer);
	const { cart } = useSelector((state) => state.cartReducer);

	const { id } = useSelector((state) => state.authReducer);

	const dispatch = useDispatch();

	const handleSubmitBtn = (transactionId) => {
		dispatch(postPaymentBill(transactionId, imagefile, id));
	};

	const [imagefile, setImagefile] = useState(null);

	const anotherButton = (status, index, transactionId) => {
		if (status === "Unpaid") {
			return (
				<>
					<button
						style={{
							margin: "0 12px 0 0",
						}}
						onClick={() => dispatch(cancelTransaction({ transactionId }))}
					>
						Cancel
					</button>
					{imagefile ? (
						<>
							<input
								// style={{ color: "rgba(0,0,0,0)" }}
								type="file"
								onChange={(e) => setImagefile(e.target.files[0])}
							/>
							<button onClick={() => handleSubmitBtn(transactionId)}>
								submit
							</button>
						</>
					) : (
						<input
							// style={{ color: "rgba(0,0,0,0)" }}
							type="file"
							onChange={(e) => setImagefile(e.target.files[0])}
						/>
					)}
				</>
			);
		}
		if (status === "Delivered") {
			return (
				<button onClick={() => dispatch(barangSampai({ transactionId }))}>
					Barang Sampai
				</button>
			);
		}
		if (status === "Canceled" || status === "Arrived") {
			return (
				<>
					{status === "Arrived" ? (
						<button
							style={{
								margin: "0 12px 0 0",
							}}
							onClick={() => review(index)}
						>
							{data[index].review ? "Lihat Review" : "Tulis Review"}
						</button>
					) : null}
					<button
						onClick={() =>
							data[index].products.map((val) => {
								const productId = val.productId;

								const find = cart.find((val) => {
									return val.product_id === productId;
								});

								if (find) {
									return dispatch(
										changeQtyCartAction({
											qty: find.qty + val.qty,
											id: find.id,
											userId: id,
										})
									);
								}

								dispatch(
									addToCartAction({
										productId: val.productId,
										userId: id,
										qty: val.qty,
									})
								);
							})
						}
					>
						Order Lagi
					</button>
				</>
			);
		}
	};

	return (
		<>
			<div
				style={{
					display: "flex",
					textAlign: "center",
					padding: "0 24px",
				}}
			>
				<div
					style={{
						// backgroundColor: "red",
						width: "140px",
						margin: "18px 0 0 0",
					}}
				>
					Transaction Id
				</div>
				<div
					style={{
						// backgroundColor: "blue",
						width: "130px",
						margin: "18px 0 0 0",
					}}
				>
					Date
				</div>
				<div
					style={{
						// backgroundColor: "red",
						width: "190px",
						margin: "18px 0 0 0",
					}}
				>
					Invoice Number
				</div>
				<div
					style={{
						// backgroundColor: "blue",
						width: "110px",
						margin: "18px 0 0 0",
					}}
				>
					Status
				</div>
				<div
					style={{
						// backgroundColor: "blue",
						width: "140px",
						margin: "18px 0 0 0",
					}}
				>
					Total
				</div>
			</div>
			<div>
				{data.map((val, i) => {
					return (
						<div
							style={{
								backgroundColor: "white",
								boxShadow: "3px 3px 24px 3px rgba(0,0,0,0.1)",
								padding: "18px 24px",
								margin: "18px 0 0 0",
							}}
						>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									textAlign: "center",
								}}
							>
								<div
									style={{
										// backgroundColor: "blue",
										width: "140px",
									}}
								>
									{val.transactionId}
								</div>
								<div
									style={{
										// backgroundColor: "red",
										width: "130px",
									}}
								>
									{val.date.split("T")[0]}
								</div>
								<div
									style={{
										// backgroundColor: "blue",
										width: "190px",
									}}
								>
									{val.invoice.code}
								</div>
								<div
									style={{
										// backgroundColor: "red",
										width: "110px",
									}}
								>
									{val.orderStatus}
								</div>
								<div
									style={{
										// backgroundColor: "blue",
										width: "140px",
										margin: "0 24px 0 0",
									}}
								>
									Rp{val.amount.toLocaleString()}
								</div>
								<button
									style={{
										margin: "0 12px 0 0",
									}}
									onClick={() => lihatItem(i)}
								>
									Detail
								</button>
								{anotherButton(val.orderStatus, i, val.transactionId)}
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default UserTransactionCard;
