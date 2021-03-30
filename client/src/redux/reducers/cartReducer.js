import {
	API_LOADING_ERROR,
	API_LOADING_START,
	API_LOADING_SUCCESS,
	GET_CART,
	NULLIFY_ERROR,
} from "../types";

const INITIAL_STATE = {
	cart: [],
	isLoading: false,
	isError: false,
	errorMessage: "",
};

const cartReducer = (state = INITIAL_STATE, action) => {
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
				errorMessage: action.payload,
				isError: true,
				isLoading: false,
			};
		case NULLIFY_ERROR:
			return {
				...state,
				errorMessage: "",
				isError: false,
			};
		case GET_CART:
			return {
				...state,
				cart: action.payload,
			};
		default:
			return state;
	}
};

export { cartReducer };
