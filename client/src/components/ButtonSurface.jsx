import { makeStyles } from "@material-ui/styles";
import React from "react";
import Loader from "react-loader-spinner";
import { Button } from "reactstrap";
import { surfaceColor, secondSurfaceColor } from "../helpers";

function ButtonSurface({
	px,
	py,
	pl,
	pr,
	pt,
	pb,
	mx,
	my,
	ml,
	mr,
	mt,
	mb,
	id,
	width,
	disabled,
	onClick,
	text,
}) {
	const styles = useStyles();
	return (
		<div
			style={{
				marginInline: mx || 0,
				marginBlock: my || 0,
				marginLeft: 0 || ml,
				marginRight: mr || 0,
				marginTop: mt || 0,
				marginBottom: mb || 0,
			}}
		>
			<Button
				color="info"
				className={styles.button}
				disabled={disabled ? disabled : null}
				onClick={onClick ? onClick : null}
				style={{
					width: width || "100%",
					paddingInline: px || 0,
					paddingBlock: py || 0,
					paddingLeft: pl || 20,
					paddingRight: pr || 20,
					paddingTop: pt || 10,
					paddingBottom: pb || 10,
				}}
			>
				{disabled ? (
					<Loader type="ThreeDots" color="white" height="auto" width={50} />
				) : (
					<div className={styles.childButton}>{text}</div>
				)}
			</Button>
		</div>
	);
}

const useStyles = makeStyles({
	button: {
		backgroundColor: surfaceColor,
		borderWidth: 0,
		paddingBlock: 10,
		borderRadius: 5,
		"&:hover": {
			backgroundColor: secondSurfaceColor,
		},
		"&:focus": {
			backgroundColor: secondSurfaceColor,
		},
	},
	childButton: {
		color: "white",
	},
});

export default ButtonSurface;
