import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";

const ProcessCartCard = ({ cart, outOfStock, onClick }) => {
	const [process, setProcess] = useState(false);

	let total = 0;

	cart.forEach((val) => {
		total += val.qty * val.price;
	});

	return (
		<>
			<div
				style={{
					backgroundColor: "white",
					height: "114px",
					width: "400px",
					padding: "24px",
					borderRadius: "12.5px 12.5px 0 0",
				}}
			>
				<div
					style={{
						fontSize: "24px",
						fontWeight: "bold",
						margin: "-9px 0 0px 0",
					}}
				>
					Total Belanja
				</div>
				<div
					style={{
						fontSize: "36px",
						fontWeight: "bold",
					}}
				>
					Rp{total.toLocaleString()}
				</div>
			</div>
			<div
				style={{
					height: "98px",
					width: "400px",
					display: "flex",
				}}
			>
				<Link
					style={{
						display: "flex",
						backgroundColor: "#61b15a",
						width: "400px",
						height: "60px",
						fontSize: "24px",
						borderRadius: "0 0 12.5px 12.5px",
						border: "none",
						cursor: "pointer",
						color: "white",
						textDecoration: "none",
						justifyContent: "center",
						alignItems: "center",
						fontWeight: "bold",
					}}
					onClick={onClick}
					to={outOfStock ? false : "/checkout"}
				>
					Process
				</Link>
			</div>
		</>
	);
};

export default ProcessCartCard;
