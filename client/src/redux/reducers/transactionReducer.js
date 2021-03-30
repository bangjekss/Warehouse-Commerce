import {
	API_LOADING_ERROR,
	API_LOADING_START,
	API_LOADING_SUCCESS,
	NULLIFY_ERROR,
	NEAREST_WAREHOUSE,
	GET_COURIER,
	CHECKOUT_SUCCESS,
	RESET_TRANSACTION,
	INSERT_TRANSACTION_DATA,
} from "../types";

const INITIAL_STATE = {
	isLoading: false,
	isError: false,
	errorMessage: "",
	nearestWarehouse: {},
	courier: {},
	isSuccess: false,
	transactionData: [],
};

const transactionReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case API_LOADING_START:
			return {
				...state,
				isLoading: true,
			};
		case API_LOADING_SUCCESS:
			return {
				...state,
				isLoading: false,
			};
		case API_LOADING_ERROR:
			return {
				...state,
				isLoading: false,
				isError: true,
				errorMessage: action.payload,
			};
		case NULLIFY_ERROR:
			return {
				...state,
				isError: false,
				errorMessage: "",
			};
		case NEAREST_WAREHOUSE:
			return {
				...state,
				nearestWarehouse: action.payload,
			};
		case GET_COURIER:
			return {
				...state,
				courier: action.payload,
			};
		case CHECKOUT_SUCCESS:
			return {
				...state,
				isSuccess: true,
			};
		case RESET_TRANSACTION:
			return INITIAL_STATE;
		case INSERT_TRANSACTION_DATA:
			return {
				...state,
				transactionData: action.payload,
			};
		default:
			return state;
	}
};

export { transactionReducer };
