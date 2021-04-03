import React from "react";
import Select from "react-select";
import { Label } from "reactstrap";
import { primaryColor } from "../helpers";

function InputSelect({
	onChange,
	defaultValue,
	options,
	label,
	mx,
	my,
	ml,
	mr,
	mt,
	mb,
	isSearchable,
}) {
	console.log(options);
	return (
		<div
			style={{
				marginInline: mx || 0,
				marginBlock: my || 0,
				marginLeft: 0 || ml,
				marginRight: mr || 0,
				marginTop: mt || 0,
				marginBottom: mb || 0,
				cursor: "pointer",
			}}
		>
			{label ? <Label>{label}</Label> : null}
			<Select
				isSearchable={isSearchable ? isSearchable : false}
				styles={selectStyles}
				options={options}
				defaultValue={defaultValue}
				onChange={onChange}
			/>
		</div>
	);
}

const selectStyles = {
	option: (provided, state) => ({
		...provided,
		borderBottom: "1px dotted pink",
		color: state.isSelected ? "white" : "black",
		padding: 10,
	}),
	control: () => ({
		borderRadius: 10,
		paddingInline: 10,
		paddingBlock: 7,
		borderWidth: 0,
		backgroundColor: primaryColor,
		boxShadow: "0 0 5px 1px rgba(0, 0, 0, 0.1)",
		display: "flex",
	}),
};

export default InputSelect;
