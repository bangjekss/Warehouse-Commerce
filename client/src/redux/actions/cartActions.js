import axios from "axios";
import {
	API_LOADING_ERROR,
	API_LOADING_START,
	API_LOADING_SUCCESS,
	GET_CART,
	NULLIFY_ERROR,
} from "../types";
import { apiUrl_cart } from "../../helpers";
import Swal from "sweetalert2";

const addToCartAction = ({ productId, userId, qty }) => {
	return async (dispatch) => {
		try {
			dispatch({ type: NULLIFY_ERROR });
			dispatch({ type: API_LOADING_START });
			await axios.post(`${apiUrl_cart}/add-to-cart/${userId}`, {
				qty,
				productId,
			});
			await dispatch(cartGetAction(userId));
			dispatch({ type: API_LOADING_SUCCESS });
			Swal.fire({
				title: "Added To Cart",
				icon: "success",
				confirmButtonColor: "#3085d6",
				confirmButtonText: "OK",
			});
		} catch (err) {
			if (!err.response) return dispatch({ type: API_LOADING_ERROR });
			dispatch({ type: API_LOADING_ERROR, payload: err.response.data.message });
		}
	};
};

const changeQtyCartAction = (payload) => {
	return async (dispatch) => {
		try {
			dispatch({ type: NULLIFY_ERROR });
			dispatch({ type: API_LOADING_START });
			const { qty, id, userId } = payload;
			await axios.put(`${apiUrl_cart}/edit-qty/${id}`, { qty });
			Swal.fire("qty changed");
			dispatch({ type: API_LOADING_SUCCESS });
			await dispatch(cartGetAction(userId));
		} catch (err) {
			if (!err.response) return dispatch({ type: API_LOADING_ERROR });
			dispatch({ type: API_LOADING_ERROR, payload: err.response.data.message });
		}
	};
};

const cartGetAction = (userId) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: API_LOADING_START,
			});

			const response = await axios.get(`${apiUrl_cart}/get/${userId}`);
			dispatch({
				type: GET_CART,
				payload: response.data,
			});
			dispatch({ type: API_LOADING_SUCCESS });
		} catch (err) {
			if (!err.response) return dispatch({ type: API_LOADING_ERROR });
			dispatch({ type: API_LOADING_ERROR, payload: err.response.data.message });
		}
	};
};

const updateCartQty = (payload) => {
	const { userId, cartId, qty } = payload;

	return async (dispatch) => {
		try {
			dispatch({
				type: NULLIFY_ERROR,
			});

			dispatch({
				type: API_LOADING_START,
			});

			await axios.patch(`${apiUrl_cart}/update-qty/${cartId}`, { qty });

			dispatch(cartGetAction(userId));
		} catch (err) {
			if (!err.response) return dispatch({ type: API_LOADING_ERROR });
			dispatch({ type: API_LOADING_ERROR, payload: err.response.data.message });
		}
	};
};

const deleteCart = (payload) => {
	const { userId, cartId } = payload;

	return async (dispatch) => {
		try {
			dispatch({
				type: NULLIFY_ERROR,
			});

			dispatch({
				type: API_LOADING_START,
			});

			await axios.delete(`${apiUrl_cart}/delete/${cartId}`);

			dispatch(cartGetAction(userId));
		} catch (err) {
			if (!err.response) return dispatch({ type: API_LOADING_ERROR });
			dispatch({ type: API_LOADING_ERROR, payload: err.response.data.message });
		}
	};
};

export {
	cartGetAction,
	updateCartQty,
	deleteCart,
	addToCartAction,
	changeQtyCartAction,
};
