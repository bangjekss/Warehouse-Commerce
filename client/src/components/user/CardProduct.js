import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card, CardImg, Button } from "reactstrap";
import Swal from "sweetalert2";
import { accentColor, surfaceColor } from "../../helpers";
import { addToCartAction } from "../../redux/actions";

const CardProduct = ({ id, name, price, stock, image, userId }) => {
	const styles = useStyles();
	const dispatch = useDispatch();
	const { isLogin } = useSelector((state) => state.authReducer);
	const handleAddToCartBtn = () => {
		if (!isLogin)
			return Swal.fire({
				icon: "info",
				title: "Oopss..!!",
				text: "You must login first",
			});
		const payload = {
			productId: id,
			qty: 1,
			userId,
		};
		dispatch(addToCartAction(payload));
	};
	return (
		<Card
			style={{
				marginBottom: 5,
				marginInline: 2,
				height: 300,
				maxHeight: 300,
				borderWidth: 0,
				boxShadow: "0 1px 12px 0px rgba(0,0,0,0.2)",
			}}
		>
			<CardImg
				style={{ backgroundColor: accentColor, objectFit: "cover" }}
				top
				width="100%"
				height="175"
				src={
					image
						? image
						: "https://www.grinvirobiotekno.com/images/product/No-image-available.jpg"
				}
				alt="Card image cap"
			/>
			<div
				style={{
					height: "100%",
					paddingInline: 10,
					paddingBlock: 10,
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
				}}
			>
				<div>
					<div>{name}</div>
					<div tag="h6" className="mb-2 text-muted">
						Rp{price.toLocaleString()}
					</div>
				</div>
				<div style={{ display: "flex", justifyContent: "flex-end" }}>
					{stock === 0 ? null : (
						<Button
							style={{ borderWidth: 0, backgroundColor: surfaceColor }}
							onClick={handleAddToCartBtn}
						>
							<i class="bi bi-cart-plus" style={{ color: "white" }}></i>
						</Button>
					)}
					<Button
						style={{
							borderWidth: 0,
							backgroundColor: accentColor,
							marginLeft: 5,
						}}
					>
						<div style={{ color: "black" }}>
							<Link to={`/detail?id=${id}`} className={styles.link}>
								Details
							</Link>
						</div>
					</Button>
				</div>
			</div>
		</Card>
	);
};

const useStyles = makeStyles({
	link: {
		color: "white",
		"&:hover": {
			textDecoration: "none",
		},
	},
});

export default CardProduct;
