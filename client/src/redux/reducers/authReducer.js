import {
	API_LOADING_ERROR,
	API_LOADING_START,
	API_LOADING_SUCCESS,
	AUTH_SIGN,
	AUTH_LOGOUT,
	NULLIFY_ERROR,
	RESET_INITIAL_STATE,
	REGISTERED_TRUE,
	CHANGE_PERMITTED,
	WANT_TO_CHANGE_PASS,
	GET_CHANGE_PASSWORD_USER_DATA,
	GET_ADDRESS,
} from "../types";

const INITIAL_STATE = {
	isLoading: false,
	isLogin: false,
	isError: false,
	errorMessage: "",
	securityQuestion: "",
	changePermitted: false,
	id: null,
	errorMessage: "",
	email: "",
	name: "",
	username: "",
	imagepath: "",
	phone: null,
	roleId: null,
	address: [],
	emailVerificationId: null,
	userStatusId: null,
	isFinished: false,
	wantToChangePass: false,
};

const authReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case API_LOADING_START:
			return {
				...state,
				isLoading: true,
				isFinished: false,
			};
		case API_LOADING_SUCCESS:
			return {
				...state,
				...action.payload,
				isLoading: false,
				isFinished: true,
			};
		case API_LOADING_ERROR:
			return {
				...state,
				errorMessage: action.payload,
				isError: true,
				isLoading: false,
				isFinished: true,
			};
		case AUTH_SIGN:
			return {
				...state,
				...action.payload,
				isLogin: true,
			};
		case AUTH_LOGOUT:
			return INITIAL_STATE;
		case NULLIFY_ERROR:
			return {
				...state,
				errorMessage: "",
				isError: false,
			};
		case REGISTERED_TRUE:
			return {
				...state,
				...action.payload,
			};
		case CHANGE_PERMITTED:
			return {
				...state,
				changePermitted: true,
			};
		case WANT_TO_CHANGE_PASS:
			return {
				...state,
				wantToChangePass: true,
			};
		case GET_CHANGE_PASSWORD_USER_DATA:
			return {
				...state,
				...action.payload,
			};
		case RESET_INITIAL_STATE:
			return INITIAL_STATE;
		case GET_ADDRESS:
			return {
				address: action.payload,
			};
		default:
			return state;
	}
};

export { authReducer };
