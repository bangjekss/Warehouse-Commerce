import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { productReducer } from "./productReducer";
import { cartReducer } from "./cartReducer";
import { adminReducer } from "./adminReducer";
import { daerahReducer } from "./daerahReducer";
import { transactionReducer } from "./transactionReducer";

export default combineReducers({
	authReducer,
	productReducer,
	cartReducer,
	adminReducer,
	transactionReducer,
	daerahReducer,
});
