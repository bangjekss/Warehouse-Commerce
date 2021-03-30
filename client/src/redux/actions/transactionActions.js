import axios from "axios";
import Swal from "sweetalert2";
import {
	apiUrl_transaction,
	matrixAPI_url,
	matrixAPI_key,
	rajaOngkirAPI_url,
	rajaOngkirAPI_key,
} from "../../helpers";
import {
	API_LOADING_ERROR,
	API_LOADING_START,
	API_LOADING_SUCCESS,
	CHECKOUT_SUCCESS,
	GET_COURIER,
	NEAREST_WAREHOUSE,
	NULLIFY_ERROR,
	INSERT_TRANSACTION_DATA,
	RESET_TRANSACTION,
} from "../types";
import { cartGetAction } from "./cartActions";
import { keepLoginAction } from "./authActions";

const currentAddressAction = (payload) => {
	return async (dispatch) => {
		try {
			dispatch({ type: NULLIFY_ERROR });
			dispatch({ type: API_LOADING_START });
			localStorage.setItem("current_address", JSON.stringify(payload));
			dispatch({ type: API_LOADING_SUCCESS });
		} catch (err) {
			if (!err.response) return dispatch({ type: API_LOADING_ERROR });
			dispatch({ type: API_LOADING_ERROR, payload: err.response.data.message });
		}
	};
};

const nearestWarehouseAction = (payload) => {
	return async (dispatch) => {
		try {
			dispatch({ type: NULLIFY_ERROR });
			dispatch({ type: API_LOADING_START });
			let distancesUserByWarehouse = [];
			let query = "";
			if (payload.city && payload.subDistrict)
				query += `${payload.subDistrict}, ${payload.city}`;
			if (payload.city && !payload.subDistrict) query += `${payload.city}`;
			query = query.replace(/ /g, "%20");
			const getWarehouse = await axios.get(`${apiUrl_transaction}/warehouse`);
			await getWarehouse.data.forEach(async (value) => {
				const getDistances = await axios.get(
					`${matrixAPI_url}/json?origins=${query}&destinations=${value.lat},${value.long}&key=${matrixAPI_key}`
				);
				distancesUserByWarehouse.push({
					warehouse: value,
					distance:
						getDistances.data.status === "INVALID_REQUEST"
							? getDistances.data
							: getDistances.data.rows[0].elements[0].distance,
				});
			});
			setTimeout(async () => {
				distancesUserByWarehouse.sort((x, y) => {
					let order = 0;
					const distanceX = x.distance.value;
					const distanceY = y.distance.value;
					if (distanceX > distanceY) order = 1;
					if (distanceX < distanceY) order = -1;
					return order;
				});
				dispatch({
					type: NEAREST_WAREHOUSE,
					payload: distancesUserByWarehouse,
				});
				const headers = {
					headers: {
						"content-type": "application/json",
						key: rajaOngkirAPI_key,
						"access-control-allow-origin": "*",
						"access-control-allow-credentials": true,
						"access-control-allow-headers":
							"DNT, Authorization, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type, Range",
					},
				};
				const jne_data = {
					origin: distancesUserByWarehouse[0].warehouse.city_id,
					destination: payload.cityId,
					weight: payload.weight,
					courier: "jne",
				};
				const pos_data = {
					origin: distancesUserByWarehouse[0].warehouse.city_id,
					destination: payload.cityId,
					weight: payload.weight,
					courier: "pos",
				};
				const tiki_data = {
					origin: distancesUserByWarehouse[0].warehouse.city_id,
					destination: payload.cityId,
					weight: payload.weight,
					courier: "tiki",
				};
				const jne = await axios.post(`${rajaOngkirAPI_url}`, jne_data, headers);
				const pos = await axios.post(`${rajaOngkirAPI_url}`, pos_data, headers);
				const tiki = await axios.post(
					`${rajaOngkirAPI_url}`,
					tiki_data,
					headers
				);
				const courier = {
					status: jne.data.rajaongkir.status,
					origin_details: jne.data.rajaongkir.origin_details,
					destination_details: jne.data.rajaongkir.destination_details,
					results: [
						jne.data.rajaongkir.results[0],
						tiki.data.rajaongkir.results[0],
						pos.data.rajaongkir.results[0],
					],
				};
				dispatch({ type: GET_COURIER, payload: courier });
				dispatch({ type: API_LOADING_SUCCESS });
			}, 5000);
		} catch (err) {
			if (!err.response) return dispatch({ type: API_LOADING_ERROR });
			dispatch({ type: API_LOADING_ERROR, payload: err.response.data.message });
		}
	};
};

const postTransaction = (payload) => {
	return async (dispatch) => {
		try {
			dispatch({ type: NULLIFY_ERROR });
			dispatch({ type: API_LOADING_START });
			localStorage.removeItem("current_address", JSON.stringify(payload));
			await axios.post(`${apiUrl_transaction}/${payload.userId}`, payload);
			Swal.fire({
				icon: "success",
				title: "we need proof of your payment",
			});
			dispatch({ type: CHECKOUT_SUCCESS });
			dispatch({ type: API_LOADING_SUCCESS });
			dispatch(cartGetAction(payload.userId));
		} catch (err) {
			if (!err.response) return dispatch({ type: API_LOADING_ERROR });
			dispatch({ type: API_LOADING_ERROR, payload: err.response.data.message });
		}
	};
};

const getTransaction = (userId) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: NULLIFY_ERROR,
			});

			dispatch({
				type: API_LOADING_START,
			});

			const response = await axios.get(`${apiUrl_transaction}/${userId}`);
			dispatch({
				type: INSERT_TRANSACTION_DATA,
				payload: response.data,
			});

			dispatch({
				type: API_LOADING_SUCCESS,
			});
		} catch (err) {
			dispatch({
				type: API_LOADING_ERROR,
				payload: err.response.data.message,
			});
		}
	};
};

const postPaymentBill = (transactionId, imagefile, userId) => {
	return async (dispatch) => {
		try {
			dispatch({ type: NULLIFY_ERROR });
			dispatch({ type: API_LOADING_START });
			let form_data = new FormData();
			const headers = {
				headers: {
					"Content-Type": "application/form-data",
				},
			};
			form_data.append("image", imagefile);
			await axios.post(
				`${apiUrl_transaction}/bill-of-payment/${transactionId}`,
				form_data,
				headers
			);
			Swal.fire({
				icon: "success",
				title: "we are checking out your payment bill as soon",
			});
			dispatch(getTransaction(userId));
			dispatch({ type: API_LOADING_SUCCESS });
		} catch (err) {
			if (!err.response) return dispatch({ type: API_LOADING_ERROR });
			dispatch({ type: API_LOADING_ERROR, payload: err.response.data.message });
		}
	};
};

const cancelTransaction = (payload) => {
	const { transactionId } = payload;
	return async (dispatch) => {
		try {
			console.log(transactionId);
			dispatch({
				type: NULLIFY_ERROR,
			});

			dispatch({
				type: API_LOADING_START,
			});

			await axios.patch(
				`${apiUrl_transaction}/cancel-transaction/${transactionId}`
			);

			dispatch(keepLoginAction());
		} catch (err) {
			if (!err.response) return dispatch({ type: API_LOADING_ERROR });
			dispatch({ type: API_LOADING_ERROR, payload: err.response.data.message });
		}
	};
};

const barangSampai = (payload) => {
	const { transactionId } = payload;
	return async (dispatch) => {
		try {
			console.log(transactionId);
			dispatch({
				type: NULLIFY_ERROR,
			});

			dispatch({
				type: API_LOADING_START,
			});

			await axios.patch(`${apiUrl_transaction}/barang-sampai/${transactionId}`);

			dispatch(keepLoginAction());
		} catch (err) {
			if (!err.response) return dispatch({ type: API_LOADING_ERROR });
			dispatch({ type: API_LOADING_ERROR, payload: err.response.data.message });
		}
	};
};

const kirimReview = (payload) => {
	const { review, transactionId } = payload;
	return async (dispatch) => {
		try {
			dispatch({
				type: NULLIFY_ERROR,
			});

			dispatch({
				type: API_LOADING_START,
			});

			await axios.patch(`${apiUrl_transaction}/kirim-review/${transactionId}`, {
				review,
			});

			dispatch(keepLoginAction());
		} catch (err) {
			if (!err.response) return dispatch({ type: API_LOADING_ERROR });
			dispatch({ type: API_LOADING_ERROR, payload: err.response.data.message });
		}
	};
};

export {
	nearestWarehouseAction,
	currentAddressAction,
	postTransaction,
	getTransaction,
	postPaymentBill,
	cancelTransaction,
	barangSampai,
	kirimReview,
};
