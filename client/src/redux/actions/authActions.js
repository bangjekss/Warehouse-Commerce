import axios from "axios";
import { apiUrl_user } from "../../helpers";
import {
	API_LOADING_START,
	API_LOADING_SUCCESS,
	API_LOADING_ERROR,
	AUTH_SIGN,
	AUTH_LOGOUT,
	NULLIFY_ERROR,
	RESET_INITIAL_STATE,
	CHANGE_PERMITTED,
	REGISTERED_TRUE,
	WANT_TO_CHANGE_PASS,
	GET_CHANGE_PASSWORD_USER_DATA,
} from "../types";
import Swal from "sweetalert2";
import { cartGetAction } from "./cartActions";
import { getDashboard } from "./adminActions";
import { getTransaction } from "./transactionActions";

const loginAction = (data) => {
	return async (dispatch) => {
		try {
			dispatch({ type: NULLIFY_ERROR });
			dispatch({ type: API_LOADING_START });
			const response = await axios.post(`${apiUrl_user}/login`, data);
			if (response.status === 202) {
				dispatch({ type: API_LOADING_SUCCESS });
				return Swal.fire({
					icon: "error",
					title: "You can not login",
					text: `because ${response.data.message}`,
				});
			}
			const {
				id,
				email,
				full_name,
				username,
				imagepath,
				phone,
				role_id,
				user_status_id,
				email_verification_id,
				token,
				user_address,
				security_question,
			} = response.data;
			localStorage.setItem("token", token);
			dispatch({
				type: AUTH_SIGN,
				payload: {
					id,
					email,
					name: full_name,
					username,
					imagepath,
					phone,
					roleId: role_id,
					userStatusId: user_status_id,
					emailVerificationId: email_verification_id,
					address: user_address,
					securityQuestion: security_question.question,
				},
			});
			console.log("ea");
			if (role_id === 1) {
				dispatch(getDashboard());
			} else {
				dispatch(cartGetAction(id));
				dispatch(getTransaction(id));
				dispatch({ type: API_LOADING_SUCCESS });
			}
		} catch (err) {
			console.log(err.response);
			if (!err.response) return dispatch({ type: API_LOADING_ERROR });
			dispatch({ type: API_LOADING_ERROR, payload: err.response.data.message });
			Swal.fire({
				title: `${err.response.data.message}`,
				icon: "error",
				confirmButtonColor: "#3085d6",
				confirmButtonText: "Ok",
			}).then((result) => {
				if (result.isConfirmed) {
					dispatch({ type: NULLIFY_ERROR });
				}
			});
		}
	};
};

const keepLoginAction = () => {
	return async (dispatch) => {
		try {
			dispatch({ type: NULLIFY_ERROR });
			dispatch({ type: API_LOADING_START });
			const token = localStorage.getItem("token");
			const headers = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			const response = await axios.post(
				`${apiUrl_user}/keepLogin`,
				{},
				headers
			);
			const {
				id,
				email,
				full_name,
				username,
				imagepath,
				phone,
				role_id,
				user_status_id,
				email_verification_id,
				user_address,
				security_question,
			} = response.data;
			dispatch({
				type: AUTH_SIGN,
				payload: {
					id,
					email,
					name: full_name,
					username,
					imagepath,
					phone,
					roleId: role_id,
					userStatusid: user_status_id,
					emailVerificationId: email_verification_id,
					address: user_address,
					securityQuestion: security_question.question,
				},
			});
			if (role_id === 1) {
				dispatch(getDashboard());
			} else {
				dispatch(cartGetAction(id));
				dispatch(getTransaction(id));
				dispatch({ type: API_LOADING_SUCCESS });
			}
		} catch (err) {
			if (!err.response) return dispatch({ type: API_LOADING_ERROR });
			dispatch({ type: API_LOADING_ERROR, payload: err.response.data.message });
		}
	};
};

const logoutAction = () => {
	return (dispatch) => {
		dispatch({ type: NULLIFY_ERROR });
		localStorage.removeItem("token");
		dispatch({
			type: AUTH_LOGOUT,
		});
	};
};

const authRegisterAction = (payload) => {
	return async (dispatch) => {
		try {
			dispatch({ type: NULLIFY_ERROR });
			dispatch({ type: AUTH_LOGOUT });
			dispatch({ type: API_LOADING_START });
			localStorage.setItem("username", payload.username);
			localStorage.setItem("email", payload.email);
			const response = await axios.post(`${apiUrl_user}/register`, payload);
			if (response.status === 209) {
				dispatch({ type: API_LOADING_SUCCESS });
				return Swal.fire({
					icon: "warning",
					title: "Ooopsss...",
					text: `${response.data.message.info}\n${response.data.message.message}`,
				});
			}
			if (response.status === 202) {
				dispatch({ type: API_LOADING_SUCCESS });
				return Swal.fire({
					icon: "warning",
					title: "Ooopsss...",
					text: `${response.data.message}`,
				});
			}
			Swal.fire({
				icon: "success",
				title: "Please Check Your Email For a Confirmation",
				text:
					"To complete the subscription process, please click the link in the email we just sent you.  If it doesn’t show up in a few minutes, check your spam folder.",
			});
			dispatch({ type: API_LOADING_SUCCESS });
		} catch (err) {
			if (!err.response) return dispatch({ type: API_LOADING_ERROR });
			dispatch({ type: API_LOADING_ERROR, payload: err.response.data.message });
		}
	};
};

const emailVerificationSuccessAction = (payload) => {
	return async (dispatch) => {
		try {
			const headers = {
				headers: {
					Authorization: `Bearer ${payload}`,
				},
			};
			const response = await axios.post(
				`${apiUrl_user}/email-verification`,
				{},
				headers
			);
			const {
				id,
				email,
				full_name,
				username,
				imagepath,
				phone,
				role_id,
				user_status_id,
				email_verification_id,
			} = response.data;
			dispatch({
				type: AUTH_SIGN,
				payload: {
					id,
					email,
					name: full_name,
					username,
					imagepath,
					phone,
					roleId: role_id,
					userStatusId: user_status_id,
					emailVerificationId: email_verification_id,
				},
			});
			localStorage.removeItem("username");
			localStorage.removeItem("email");
			localStorage.setItem("token", response.data.token);
			Swal.fire({
				icon: "success",
				title: "Registered Successfully",
			});
			dispatch({ type: API_LOADING_SUCCESS });
		} catch (err) {
			if (!err.response) return dispatch({ type: API_LOADING_ERROR });
			dispatch({ type: API_LOADING_ERROR, payload: err.response.data.message });
		}
	};
};

const authRegisteredCheck = (payload) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: NULLIFY_ERROR,
			});

			dispatch({
				type: API_LOADING_START,
			});

			const response = await axios.post(
				`${apiUrl_user}/registered-checker`,
				payload
			);
			const { id, email } = response.data;
			const security_question = response.data["security_question.question"];

			dispatch({
				type: REGISTERED_TRUE,
				payload: {
					id,
					email,
					securityQuestion: security_question,
					registered: true,
				},
			});

			dispatch({ type: WANT_TO_CHANGE_PASS });
			dispatch({ type: API_LOADING_SUCCESS });
		} catch (err) {
			if (!err.response) return dispatch({ type: API_LOADING_ERROR });
			dispatch({ type: API_LOADING_ERROR, payload: err.response.data.message });
		}
	};
};

const authSecurityAnswerCheck = (payload) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: NULLIFY_ERROR,
			});

			dispatch({
				type: API_LOADING_START,
			});

			await axios.post(`${apiUrl_user}/security-question-checker`, payload);

			dispatch({
				type: CHANGE_PERMITTED,
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

const authChangePasswordEmailRequest = (payload) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: NULLIFY_ERROR,
			});

			dispatch({
				type: API_LOADING_START,
			});

			await axios.post(`${apiUrl_user}/change-password-email-request`, payload);

			alert(
				"Link untuk mengubah password sudah dikirim ke email anda. Silahkan cek email anda."
			);

			dispatch({
				type: API_LOADING_SUCCESS,
			});
		} catch (err) {
			if (!err.response) return dispatch({ type: API_LOADING_ERROR });
			dispatch({ type: API_LOADING_ERROR, payload: err.response.data.message });
		}
	};
};

const getChangePasswordUserData = (payload) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: NULLIFY_ERROR,
			});

			dispatch({
				type: API_LOADING_START,
			});

			const response = await axios.post(
				`${apiUrl_user}/registered-checker`,
				payload
			);
			const { id, email } = response.data;

			dispatch({
				type: GET_CHANGE_PASSWORD_USER_DATA,
				payload: { id, email, wantToChangePass: true, registered: true },
			});
		} catch (err) {
			if (!err.response) return dispatch({ type: API_LOADING_ERROR });
			dispatch({ type: API_LOADING_ERROR, payload: err.response.data.message });
		}
	};
};

const authChangePassword = (payload) => {
	const { token, newPassword, id } = payload;

	return async (dispatch) => {
		try {
			dispatch({
				type: NULLIFY_ERROR,
			});

			dispatch({
				type: API_LOADING_START,
			});

			const headers = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};

			if (token) {
				await axios.patch(
					`${apiUrl_user}/change-password-with-email`,
					{ newPassword },
					headers
				);
			} else {
				await axios.patch(`${apiUrl_user}/change-password-without-email`, {
					newPassword,
					id,
				});
			}

			alert("Password berhasil diganti. Anda akan dialihkan ke halaman login.");

			dispatch({
				type: RESET_INITIAL_STATE,
			});
		} catch (err) {
			if (!err.response) return dispatch({ type: API_LOADING_ERROR });
			dispatch({ type: API_LOADING_ERROR, payload: err.response.data.message });
		}
	};
};

const changeMainAddressAction = (payload) => {
	return async (dispatch) => {
		try {
			dispatch({ type: NULLIFY_ERROR });
			dispatch({ type: API_LOADING_START });
			const oldToken = localStorage.getItem("token");
			const headers = {
				headers: {
					Authorization: `Bearer ${oldToken}`,
				},
			};
			const response = await axios.patch(
				`${apiUrl_user}/change-main-address/`,
				payload,
				headers
			);
			localStorage.removeItem("token");
			const {
				id,
				email,
				full_name,
				username,
				imagepath,
				phone,
				role_id,
				user_status_id,
				email_verification_id,
				token,
				user_address,
			} = response.data;
			localStorage.setItem("token", token);
			dispatch({
				type: AUTH_SIGN,
				payload: {
					id,
					email,
					name: full_name,
					username,
					imagepath,
					phone,
					roleId: role_id,
					userStatusId: user_status_id,
					isLogin: true,
					emailVerificationId: email_verification_id,
					address: user_address,
				},
			});
			dispatch({ type: API_LOADING_SUCCESS });
		} catch (err) {
			if (!err.response) return dispatch({ type: API_LOADING_ERROR });
			dispatch({ type: API_LOADING_ERROR, payload: err.response.data.message });
		}
	};
};

const addAddress = (payload) => {
	const { kota } = payload;

	let kotaMod = "";

	kota.split(" ").forEach((val, i) => {
		kotaMod += val;
		if (i == kota.split(" ").length - 1) return (kotaMod += "");
		return (kotaMod += "+");
	});

	return async (dispatch) => {
		try {
			dispatch({
				type: NULLIFY_ERROR,
			});

			dispatch({
				type: API_LOADING_START,
			});

			const cityId = await axios.post(`${apiUrl_user}/get-city-id`, {
				fullCityName: kota,
			});

			const response = await axios.get(
				`https://api.distancematrix.ai/maps/api/geocode/json?address=${kotaMod}&key=8V2fGfu36JumHiAyuQFhXuBy3f55K`
			);

			const coordinate = response.data.result[0].geometry.location;

			await axios.post(`${apiUrl_user}/add-address`, {
				...payload,
				...coordinate,
				cityId: cityId.data,
			});

			dispatch(keepLoginAction());
		} catch (err) {
			dispatch({
				type: API_LOADING_ERROR,
				payload: err.response.data.message,
			});
		}
	};
};

const editAddress = (payload) => {
	const { kota } = payload;

	let kotaMod = "";

	kota.split(" ").forEach((val, i) => {
		kotaMod += val;
		if (i == kota.split(" ").length - 1) return (kotaMod += "");
		return (kotaMod += "+");
	});

	return async (dispatch) => {
		try {
			dispatch({
				type: NULLIFY_ERROR,
			});

			dispatch({
				type: API_LOADING_START,
			});

			const cityId = await axios.post(`${apiUrl_user}/get-city-id`, {
				fullCityName: kota,
			});

			const response = await axios.get(
				`https://api.distancematrix.ai/maps/api/geocode/json?address=${kotaMod}&key=8V2fGfu36JumHiAyuQFhXuBy3f55K`
			);

			const coordinate = response.data.result[0].geometry.location;

			await axios.patch(`${apiUrl_user}/edit-address`, {
				...payload,
				...coordinate,
				cityId: cityId.data,
			});

			dispatch(keepLoginAction());
		} catch (err) {
			dispatch({
				type: API_LOADING_ERROR,
				payload: err.response.data.message,
			});
		}
	};
};

const deleteAddress = (payload) => {
	const { id } = payload;

	return async (dispatch) => {
		try {
			dispatch({
				type: NULLIFY_ERROR,
			});

			dispatch({
				type: API_LOADING_START,
			});

			await axios.delete(`${apiUrl_user}/delete-address/${id}`);

			dispatch(keepLoginAction());
		} catch (err) {
			dispatch({
				type: API_LOADING_ERROR,
				payload: err.response.data.message,
			});
		}
	};
};

const editProfile = (payload) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: NULLIFY_ERROR,
			});

			dispatch({
				type: API_LOADING_START,
			});

			await axios.patch(`${apiUrl_user}/edit-profile`, payload);

			dispatch(keepLoginAction());
		} catch (err) {
			dispatch({
				type: API_LOADING_ERROR,
				payload: err.response.data.message,
			});
		}
	};
};

const uploadProfilePic = (payload) => {
	const { image, userId } = payload;

	let formData = new FormData();
	formData.append("image", image.imageFile);

	return async (dispatch) => {
		try {
			dispatch({
				type: NULLIFY_ERROR,
			});

			dispatch({
				type: API_LOADING_START,
			});

			const headers = {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			};

			await axios.patch(
				`${apiUrl_user}/edit-profile-pic/${userId}`,
				formData,
				headers
			);

			dispatch(keepLoginAction());
		} catch (err) {
			dispatch({
				type: API_LOADING_ERROR,
				payload: err.response.data.message,
			});
		}
	};
};

export {
	authRegisterAction,
	logoutAction,
	keepLoginAction,
	loginAction,
	authRegisteredCheck,
	authSecurityAnswerCheck,
	authChangePasswordEmailRequest,
	authChangePassword,
	emailVerificationSuccessAction,
	getChangePasswordUserData,
	changeMainAddressAction,
	addAddress,
	editAddress,
	deleteAddress,
	editProfile,
	uploadProfilePic,
};
