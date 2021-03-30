import React from "react";
import { primaryColor, surfaceColor } from "../../helpers";

const UserFooter = () => {
	return (
		<div
			style={{
				backgroundColor: surfaceColor,
				minHeight: "200px",
				paddingBlock: 50,
				paddingInline: 200,
				display: "flex",
				justifyContent: "space-between",
			}}
		>
			<div style={{ width: "23.3%", backgroundColor: "" }}>
				<div>
					<div
						style={{
							fontSize: 20,
							fontWeight: "bold",
							textTransform: "uppercase",
						}}
					>
						about us
					</div>
				</div>
				<div
					style={{
						marginTop: 8,
						marginBottom: 20,
						width: "50px",
						height: "4px",
						backgroundColor: "rgba(0,0,0,0.3)",
					}}
				></div>
				<div style={{ marginBottom: 20 }}>
					<div style={{ fontSize: 13, lineHeight: 2 }}>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi
						non quis exercitationem culpa nesciunt nihil aut nostrum explicabo
						reprehenderit optio amet ab temporibus asperiores quasi cupiditate.
						Voluptatum ducimus voluptates voluptas?
					</div>
				</div>
				<div className="d-flex justify-content-around">
					<div>
						<i style={{ fontSize: 20 }} class="bi bi-facebook"></i>
					</div>
					<div>
						<i style={{ fontSize: 20 }} class="bi bi-instagram"></i>
					</div>
					<div>
						<i style={{ fontSize: 20 }} class="bi bi-twitter"></i>
					</div>
					<div>
						<i style={{ fontSize: 20 }} class="bi bi-envelope"></i>
					</div>
				</div>
			</div>
			<div style={{ width: "23.3%", backgroundColor: "" }}>
				<div>
					<div
						style={{
							fontSize: 20,
							fontWeight: "bold",
							textTransform: "uppercase",
						}}
					>
						information
					</div>
				</div>
				<div
					style={{
						marginTop: 8,
						marginBottom: 20,
						width: "50px",
						height: "4px",
						backgroundColor: "rgba(0,0,0,0.3)",
					}}
				></div>
				<div>
					<div style={{ marginBottom: 10 }}>Home</div>
					<div style={{ marginBottom: 10 }}>Privacy Policy</div>
					<div style={{ marginBottom: 10 }}>FAQ</div>
					<div style={{ marginBottom: 0 }}>Terms & Conditions</div>
				</div>
			</div>
			<div style={{ width: "23.3%", backgroundColor: "" }}>
				<div>
					<div
						style={{
							fontSize: 20,
							fontWeight: "bold",
							textTransform: "uppercase",
						}}
					>
						Order
					</div>
				</div>
				<div
					style={{
						marginTop: 8,
						marginBottom: 20,
						width: "50px",
						height: "4px",
						backgroundColor: "rgba(0,0,0,0.3)",
					}}
				></div>
				<div>
					<div style={{ marginBottom: 10 }}>How To Order</div>
					<div style={{ marginBottom: 10 }}>Shippings</div>
					<div style={{ marginBottom: 10 }}>Returns</div>
					<div style={{ marginBottom: 0 }}>Payment</div>
				</div>
			</div>
			<div style={{ width: "23.3%", backgroundColor: "" }}>
				<div>
					<div
						style={{
							fontSize: 20,
							fontWeight: "bold",
							textTransform: "uppercase",
						}}
					>
						contact us
					</div>
				</div>
				<div
					style={{
						marginTop: 8,
						marginBottom: 20,
						width: "50px",
						height: "4px",
						backgroundColor: "rgba(0,0,0,0.3)",
					}}
				></div>
				<div>
					<div style={{ marginBottom: 20 }}>
						<div>
							<div
								style={{
									fontSize: 15,
									fontWeight: "bold",
									textTransform: "uppercase",
								}}
							>
								online services
							</div>
						</div>
						<div>
							<div style={{ fontSize: 13, lineHeight: 2 }}>Everyday</div>
							<div style={{ fontSize: 13, lineHeight: 2 }}>08.00 - 17.00</div>
						</div>
					</div>
					<div style={{ marginBottom: 20 }}>
						<div>
							<div
								style={{
									fontSize: 15,
									fontWeight: "bold",
									textTransform: "uppercase",
								}}
							>
								customer services
							</div>
						</div>
						<div>
							<div style={{ fontSize: 13, lineHeight: 2 }}>
								Email: nature.goods.official@gmail.com
							</div>
							<div style={{ fontSize: 13, lineHeight: 2 }}>
								Telp: 021 625 7502
							</div>
							<div style={{ fontSize: 13, lineHeight: 2 }}>
								LINE: @official.nature_goods{" "}
							</div>
						</div>
					</div>
					<div style={{ marginBottom: 0 }}>
						<div>
							<div
								style={{
									fontSize: 15,
									fontWeight: "bold",
									textTransform: "uppercase",
								}}
							>
								Wholesale
							</div>
						</div>
						<div>
							<div style={{ fontSize: 13, lineHeight: 2 }}>Everyday</div>
							<div style={{ fontSize: 13, lineHeight: 2 }}>08.00 - 17.00</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserFooter;
