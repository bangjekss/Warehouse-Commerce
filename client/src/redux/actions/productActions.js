import axios from "axios";
import { apiUrl_product } from "../../helpers";
import {
	API_LOADING_ERROR,
	API_LOADING_START,
	API_LOADING_SUCCESS,
	GET_PRODUCTS,
	GET_PRODUCTS_ID,
	NULLIFY_ERROR,
	RESET_TRANSACTION,
} from "../types";

const getProductsAction = (query = "") => {
	return async (dispatch) => {
		try {
			dispatch({ type: RESET_TRANSACTION });
			dispatch({ type: NULLIFY_ERROR });
			dispatch({ type: API_LOADING_START });
			const response = await axios.get(
				`${apiUrl_product}/search${query !== "" ? `?${query}` : ""}`
			);
			const { maxPrice, minPrice, products } = response.data;
			dispatch({
				type: GET_PRODUCTS,
				payload: { maxPrice, minPrice, products },
			});
			dispatch({ type: API_LOADING_SUCCESS });
		} catch (err) {
			if (!err.response) return dispatch({ type: API_LOADING_ERROR });
			dispatch({ type: API_LOADING_ERROR, payload: err.response.data.message });
		}
	};
};
const getProductById = (id) => {
	return async (dispatch) => {
		try {
			dispatch({ type: NULLIFY_ERROR });
			dispatch({ type: API_LOADING_START });
			const response = await axios.get(`${apiUrl_product}/${id}`);
			dispatch({ type: GET_PRODUCTS_ID, payload: response.data });
			dispatch({ type: API_LOADING_SUCCESS });
		} catch (err) {
			if (!err.response) return dispatch({ type: API_LOADING_ERROR });
			dispatch({ type: API_LOADING_ERROR, payload: err.response.data.message });
		}
	};
};

export { getProductsAction, getProductById };
