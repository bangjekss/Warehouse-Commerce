import {
	API_LOADING_ERROR,
	API_LOADING_START,
	API_LOADING_SUCCESS,
	GET_DATA_DAERAH,
	NULLIFY_ERROR,
	RESET_DAERAH_INITIAL_STATE,
} from "../types";

const INITIAL_STATE = {
	provinsi: [],
	kota: [],
	kecamatan: [],
	kelurahan: [],
	isLoading: false,
	isError: false,
	errorMessage: "",
	isFinished: false,
};

const daerahReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case API_LOADING_START:
			return {
				...state,
				isLoading: true,
			};
		case API_LOADING_SUCCESS:
			return {
				...state,
				...action.payload,
				isLoading: true,
				isFinished: true,
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
		case GET_DATA_DAERAH:
			return {
				...state,
				...action.payload,
			};
		case RESET_DAERAH_INITIAL_STATE:
			return INITIAL_STATE;
		default:
			return state;
	}
};

export { daerahReducer };
