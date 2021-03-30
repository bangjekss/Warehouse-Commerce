import {
  API_LOADING_ERROR,
  API_LOADING_START,
  API_LOADING_SUCCESS,
  FILL_TRANSACTION_DATA,
  GET_DASHBOARD,
  MONITORING,
  GET_ADMIN_PRODUCTS,
  NULLIFY_ERROR,
  GET_WAREHOUSE,
} from "../types";

const INITIAL_STATE = {
  isLoading: false,
  isError: false,
  errorMessage: false,
  dashboard: {},
  monitoring: [],
  transactionData: [],
  warehouse: [],
  categories: [],
  Warehouse1: null,
  Warehouse2: null,
  Warehouse3: null,
};

const adminReducer = (state = INITIAL_STATE, action) => {
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
    case GET_DASHBOARD:
      return {
        ...state,
        dashboard: action.payload,
      };
    case MONITORING:
      return {
        ...state,
        monitoring: action.payload,
      };
    case FILL_TRANSACTION_DATA:
      return {
        ...state,
        transactionData: action.payload,
      };
    case GET_ADMIN_PRODUCTS:
      return {
        ...state,
        ...action.payload,
      };
    case GET_WAREHOUSE:
      return {
        ...state,
        categories: action.payload,
      };
    default:
      return state;
  }
};

export { adminReducer };
