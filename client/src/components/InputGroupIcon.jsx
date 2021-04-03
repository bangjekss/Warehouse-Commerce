import { makeStyles } from "@material-ui/styles";
import React from "react";
import {
	Input,
	InputGroupAddon,
	InputGroupText,
	Label,
	InputGroup,
} from "reactstrap";
import { primaryColor, focusColor } from "../helpers";

function InputGroupIcon({
	styleInputContainer,
	label,
	placeholder,
	onChange,
	type,
	mx,
	my,
	ml,
	mr,
	mt,
	mb,
	id,
	autoComplete,
	width,
	iconOnClick,
	isPassword,
	showPassword,
	icon_first,
	icon_second,
}) {
	const styles = useStyles();

	if (isPassword) {
		return (
			<div
				style={{
					width: width || "100%",
					marginInline: mx || 0,
					marginBlock: my || 0,
					marginLeft: 0 || ml,
					marginRight: mr || 0,
					marginTop: mt || 0,
					marginBottom: mb || 0,
				}}
			>
				{label ? <Label>{label}</Label> : null}
				<InputGroup className={styles.inputGroupForm}>
					<Input
						autoComplete={autoComplete || null}
						id={id || null}
						type={type || "text"}
						placeholder={placeholder || null}
						className={styles.input}
						onChange={onChange}
					/>
					<InputGroupAddon addonType="prepend">
						<InputGroupText
							onClick={iconOnClick ? iconOnClick : null}
							style={{
								borderRadius: 10,
								borderWidth: 0,
								cursor: "pointer",
							}}
						>
							{showPassword ? (
								<i className={icon_first}></i>
							) : (
								<i className={icon_second}></i>
							)}
						</InputGroupText>
					</InputGroupAddon>
				</InputGroup>
			</div>
		);
	}

	return (
		<div
			style={{
				width: width || "100%",
				marginInline: mx || 0,
				marginBlock: my || 0,
				marginLeft: 0 || ml,
				marginRight: mr || 0,
				marginTop: mt || 0,
				marginBottom: mb || 0,
			}}
		>
			{label ? <Label>{label}</Label> : null}
			<InputGroup
				className={styles.inputGroupForm}
				style={{
					borderRadius: styleInputContainer
						? styleInputContainer.borderRadius
						: null,
				}}
			>
				<Input
					autoComplete={autoComplete || null}
					id={id || null}
					type={type || "text"}
					placeholder={placeholder || null}
					className={styles.input}
					onChange={onChange}
					style={{
						backgroundColor: styleInputContainer
							? styleInputContainer.backgroundColor
							: null,
						borderTopLeftRadius: styleInputContainer
							? styleInputContainer.borderRadius
							: null,
						borderBottomLeftRadius: styleInputContainer
							? styleInputContainer.borderRadius
							: null,
						paddingInline: styleInputContainer
							? styleInputContainer.paddingInline
							: null,
						paddingBlock: styleInputContainer
							? styleInputContainer.paddingBlock
							: null,
					}}
				/>
				<InputGroupAddon addonType="prepend">
					<InputGroupText
						onClick={iconOnClick ? iconOnClick : null}
						style={{
							borderTopRightRadius: styleInputContainer
								? styleInputContainer.borderRadius
								: null,
							borderBottomRightRadius: styleInputContainer
								? styleInputContainer.borderRadius
								: null,
							borderWidth: 0,
							cursor: "pointer",
						}}
					>
						<i className={icon_first}></i>
					</InputGroupText>
				</InputGroupAddon>
			</InputGroup>
		</div>
	);
}

const useStyles = makeStyles({
	inputGroupForm: {
		borderRadius: 10,
		borderWidth: 0,
		backgroundColor: primaryColor,
		boxShadow: "0 0 5px 1px rgba(0, 0, 0, 0.1)",
	},
	input: {
		borderRadius: 10,
		paddingInline: 20,
		paddingBlock: 25,
		borderWidth: 0,
		backgroundColor: primaryColor,
		// "&:focus": {
		// 	backgroundColor: focusColor,
		// },
	},
});

export default InputGroupIcon;
