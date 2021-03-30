// GENERAL
const API_LOADING_START = "API_LOADING_START";
const API_LOADING_SUCCESS = "API_LOADING_SUCCESS";
const API_LOADING_ERROR = "API_LOADING_ERROR";
const NULLIFY_ERROR = "NULLIFY_ERROR";

// AUTH
const AUTH_SIGN = "AUTH_SIGN";
const AUTH_LOGOUT = "AUTH_LOGOUT";
const RESET_INITIAL_STATE = "RESET_INITIAL_STATE";
const REGISTERED_TRUE = "REGISTERED_TRUE";
const CHANGE_PERMITTED = "CHANGE_PERMITTED";
const WANT_TO_CHANGE_PASS = "WANT_TO_CHANGE_PASS";
const GET_CHANGE_PASSWORD_USER_DATA = "GET_CHANGE_PASSWORD_USER_DATA";

// PRODUCT
const GET_PRODUCTS = "GET_PRODUCTS";
const GET_PRODUCTS_ID = "GET_PRODUCTS_ID";

// CART
const GET_CART = "GET_CART";
const GET_ADDRESS = "GET_ADDRESS";
const NEAREST_WAREHOUSE = "NEAREST_WAREHOUSE";
const GET_COURIER = "GET_COURIER";
const CHECKOUT_SUCCESS = "CHECKOUT_SUCCESS";
const RESET_TRANSACTION = "RESET_TRANSACTION";
const INSERT_TRANSACTION_DATA = "INSERT_TRANSACTION_DATA";
const MONITORING = "MONITORING";

// ADMIN
const GET_DASHBOARD = "GET_DASHBOARD";
const FILL_TRANSACTION_DATA = "FILL_TRANSACTION_DATA";
const GET_ADMIN_PRODUCTS = "GET_ADMIN_PRODUCTS";
const GET_WAREHOUSE = "GET_WAREHOUSE";

// API DAERAH
const GET_DATA_DAERAH = "GET_DATA_DAERAH";
const RESET_DAERAH_INITIAL_STATE = "RESET_DAERAH_INITIAL_STATE";

export {
  API_LOADING_START,
  API_LOADING_SUCCESS,
  API_LOADING_ERROR,
  NULLIFY_ERROR,
  AUTH_SIGN,
  AUTH_LOGOUT,
  GET_PRODUCTS,
  GET_PRODUCTS_ID,
  RESET_INITIAL_STATE,
  REGISTERED_TRUE,
  CHANGE_PERMITTED,
  GET_DASHBOARD,
  WANT_TO_CHANGE_PASS,
  GET_CHANGE_PASSWORD_USER_DATA,
  GET_CART,
  GET_ADDRESS,
  NEAREST_WAREHOUSE,
  GET_COURIER,
  CHECKOUT_SUCCESS,
  RESET_TRANSACTION,
  RESET_DAERAH_INITIAL_STATE,
  GET_DATA_DAERAH,
  INSERT_TRANSACTION_DATA,
  MONITORING,
  FILL_TRANSACTION_DATA,
  GET_ADMIN_PRODUCTS,
  GET_WAREHOUSE,
};
