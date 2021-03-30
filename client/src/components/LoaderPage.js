import React from "react";
import { svgLoader } from "../assets";

const LoaderPage = (props) => {
	return (
		<div
			className="d-flex justify-content-center align-items-center"
			style={{ height: "600px" }}
		>
			<img src={svgLoader} height="200" width="auto" />
		</div>
	);
};

export default LoaderPage;
