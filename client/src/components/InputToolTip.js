import React from "react";
import { Tooltip } from "reactstrap";
import { primaryColor } from "../helpers";

const InputToolTip = ({ when, target, title, text }) => {
	if (!text) {
		return (
			<Tooltip
				hideArrow={true}
				style={{
					borderWidth: 0,
					backgroundColor: "rgba(209, 8, 18, 0)",
					color: "white",
					padding: 0,
					width: 200,
				}}
				placement="bottom-start"
				isOpen={when}
				target={target}
			>
				<div
					style={{
						paddingInline: 5,
						border: "2px solid red",
						borderRadius: 10,
						width: "100%",
						marginRight: 10,
						backgroundColor: primaryColor,
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<div>
						<i
							class="bi bi-x-circle-fill"
							style={{ fontSize: 11, color: "red" }}
						></i>
					</div>
					<div>
						<div
							style={{
								color: "red",
								fontWeight: "bold",
								fontSize: 11,
							}}
						>
							{title}
						</div>
					</div>
					<div>
						<i
							class="bi bi-x-circle-fill"
							style={{ fontSize: 11, color: "red" }}
						></i>
					</div>
				</div>
			</Tooltip>
		);
	}
	return (
		<Tooltip
			hideArrow={true}
			style={{
				borderWidth: 0,
				backgroundColor: "rgba(209, 8, 18, 0)",
				color: "white",
				padding: 0,
				width: 200,
			}}
			placement="bottom-start"
			isOpen={when}
			target={target}
		>
			<div
				style={{
					paddingInline: 5,
					border: "2px solid red",
					borderTopLeftRadius: 10,
					borderTopRightRadius: 10,
					width: "100%",
					marginRight: 10,
					backgroundColor: primaryColor,
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<div>
					<i
						class="bi bi-x-circle-fill"
						style={{ fontSize: 11, color: "red" }}
					></i>
				</div>
				<div>
					<div
						style={{
							color: "red",
							fontWeight: "bold",
							fontSize: 11,
						}}
					>
						{title}
					</div>
				</div>
				<div>
					<i
						class="bi bi-x-circle-fill"
						style={{ fontSize: 11, color: "red" }}
					></i>
				</div>
			</div>
			<div
				style={{
					width: "100%",
					marginRight: 10,
					backgroundColor: "red",
					paddingInline: 5,
					paddingBlock: 5,
					borderBottomLeftRadius: 10,
					borderBottomRightRadius: 10,
				}}
			>
				<div style={{ fontSize: 10 }}>{text}</div>
			</div>
		</Tooltip>
	);
};

export default InputToolTip;
