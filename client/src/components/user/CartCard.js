import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCart, updateCartQty } from "../../redux/actions";

const CartCard = ({ cart, userId }) => {
	const dispatch = useDispatch();

	return (
		<>
			{cart.map((val) => {
				let description;

				if (val.description.length > 55) {
					description = val.description.split("");

					description.splice(54, description.length - 54);
					description = description.join("");
				}

				return (
					<div
						style={{
							display: "flex",
							backgroundColor: "white",
							boxShadow: "3px 3px 24px 3px rgba(0,0,0,0.1)",
							margin: "0 0 24px 0",
							borderRadius: "12.5px",
						}}
					>
						<div
							style={{
								display: "flex",
								// backgroundColor: "red",
								width: "100px",
								flex: "7",
								padding: "24px",
								borderRadius: "12.5px 0 0 12.5px",
							}}
						>
							<div>
								<img
									style={{
										width: "192px",
										border: "#61b15a solid 0.5px",
									}}
									src={`http://localhost:2000/${val.imagepath}`}
									alt={val.name}
								></img>
							</div>
							<div
								style={{
									// width: "224px",
									flex: "1",
									// backgroundColor: "red",
									margin: "0 24px 0 24px",
								}}
							>
								<div>{val.category}</div>
								<div
									style={{
										fontSize: "24px",
										fontWeight: "bold",
										margin: "-4px 0 0 0",
									}}
								>
									{val.name}
								</div>
								<div
									style={{
										margin: "8px 0 0 0",
									}}
								>
									{description ? `${description}...` : val.description}
								</div>
								<div style={{ margin: "12px 0 0 0" }}>Quantity:</div>
								<div style={{ margin: "0 0 0 0" }}>
									<div
										style={{
											display: "flex",
											margin: "5px 0 0 0",
										}}
									>
										<button
											style={{
												margin: "0 0 0 0",
												width: "48px",
												height: "36px",
											}}
											onClick={() =>
												dispatch(
													updateCartQty({
														userId,
														cartId: val.id,
														qty: val.qty - 1,
													})
												)
											}
											disabled={
												val.qty <= 1 || val.stock <= 0 || val.stock < val.qty
											}
										>
											-
										</button>
										<div
											style={{
												width: "48px",
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
											}}
										>
											{val.qty}
										</div>
										<button
											style={{
												margin: "0 12px 0 0",
												width: "48px",
												height: "36px",
											}}
											onClick={() =>
												dispatch(
													updateCartQty({
														userId,
														cartId: val.id,
														qty: val.qty + 1,
													})
												)
											}
											disabled={val.stock <= 0 || val.stock < val.qty}
										>
											+
										</button>
										<button
											style={{
												margin: "0 0 0 0",
												width: "48px",
												height: "36px",
												backgroundColor: "red",
											}}
											onClick={() =>
												dispatch(
													deleteCart({
														userId,
														cartId: val.id,
													})
												)
											}
										>
											<i
												className="bi bi-trash-fill"
												style={{ fontSize: "16px", color: "white" }}
											></i>
										</button>
									</div>
								</div>
							</div>
						</div>
						<div
							style={{
								backgroundColor: `${
									val.stock <= 0 || val.stock < val.qty ? "red" : "#61b15a"
								}`,
								flex: "3",
								padding: "24px",
								borderRadius: "0 12.5px 12.5px 0",
							}}
						>
							<div
								style={{
									fontSize: "24px",
									fontWeight: "bold",
									display: "flex",
									flexDirection: "column",
									justifyContent: "center",
									alignItems: "center",
									// backgroundColor: "red",
									height: "100%",
									color: "white",
								}}
							>
								<div>
									{val.stock <= 0 || val.stock < val.qty
										? "Out of Stock"
										: null}
								</div>
								<div
									style={{
										color: `${
											val.stock <= 0 || val.stock < val.qty
												? "rgba(255, 255, 255, 0.5)"
												: "white"
										}`,
									}}
								>{`Rp${(val.qty * val.price).toLocaleString()}`}</div>
							</div>
						</div>
					</div>
				);
			})}
		</>
	);
};
export default CartCard;
