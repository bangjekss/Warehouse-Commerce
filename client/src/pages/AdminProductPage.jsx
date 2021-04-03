import React from "react";
import {
	ButtonAccent,
	ButtonSurface,
	InputGroupIcon,
	TableCustom,
} from "../components";

const AdminProductPage = () => {
	return (
		<div style={{ paddingInline: 50, paddingBlock: 30 }}>
			<div className="d-flex justify-content-between align-items-center mb-3">
				<div>
					<InputGroupIcon
						placeholder="product name . . ."
						icon_first="bi bi-search"
						styleInputContainer={{
							backgroundColor: "white",
							borderRadius: 50,
							paddingBlock: 20,
							paddingInline: 25,
						}}
					/>
				</div>
				<div>
					<ButtonSurface text="+ New Product" />
				</div>
			</div>
			<TableCustom />
		</div>
	);
};

export default AdminProductPage;
