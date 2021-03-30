import {
  API_LOADING_START,
  NULLIFY_ERROR,
  API_LOADING_SUCCESS,
  API_LOADING_ERROR,
  GET_DASHBOARD,
  MONITORING,
  FILL_TRANSACTION_DATA,
  GET_ADMIN_PRODUCTS,
  GET_WAREHOUSE,
} from "../types";
import axios from "axios";
import { apiUrl_admin, apiUrl_transaction } from "../../helpers";
import Swal from "sweetalert2";

const getDashboard = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: NULLIFY_ERROR });
      dispatch({ type: API_LOADING_START });
      const response = await axios.get(`${apiUrl_admin}/dashboard`);
      dispatch({ type: GET_DASHBOARD, payload: response.data });
      dispatch({ type: API_LOADING_SUCCESS });
    } catch (err) {
      if (!err.response) return dispatch({ type: API_LOADING_ERROR });
      dispatch({ type: API_LOADING_ERROR, payload: err.response.data.message });
    }
  };
};

const monitoringAction = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: NULLIFY_ERROR });
      dispatch({ type: API_LOADING_START });
      const response = await axios.get(`${apiUrl_admin}/monitoring`);
      dispatch({ type: MONITORING, payload: response.data });
      dispatch({ type: API_LOADING_SUCCESS });
    } catch (err) {
      if (!err.response) return dispatch({ type: API_LOADING_ERROR });
      dispatch({ type: API_LOADING_ERROR, payload: err.response.data.message });
    }
  };
};

const fetchWarehouse = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: NULLIFY_ERROR });
      dispatch({ type: API_LOADING_START });
      const response = await axios.get(`${apiUrl_admin}/fetchWarehouse`);
      dispatch({ type: GET_WAREHOUSE, payload: response.data });
      dispatch({ type: API_LOADING_SUCCESS });
    } catch (err) {
      dispatch({ type: API_LOADING_ERROR, payload: err.response });
    }
  };
};

const getAllTransaction = (payload) => {
  const { clickLoad } = payload;
  return async (dispatch) => {
    try {
      // console.log(clickLoad);

      dispatch({
        type: NULLIFY_ERROR,
      });

      dispatch({
        type: API_LOADING_START,
      });

      const response = await axios.get(
        `${apiUrl_transaction}/get-all-transaction/${clickLoad}`
      );

      dispatch({
        type: FILL_TRANSACTION_DATA,
        payload: response.data,
      });

      dispatch({
        type: API_LOADING_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: API_LOADING_ERROR,
        payload: err.response,
      });
    }
  };
};

const getProductsByWarehouse = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: API_LOADING_START });
      const response = await axios.get(
        `${apiUrl_admin}/get-by-warehouse/${id}`
      );
      const { Warehouse1, Warehouse2, Warehouse3, warehouse } = response.data;
      dispatch({
        type: GET_ADMIN_PRODUCTS,
        payload: {
          Warehouse1,
          Warehouse2,
          Warehouse3,
          warehouse,
        },
      });
      dispatch({ type: API_LOADING_SUCCESS });
      dispatch({ type: NULLIFY_ERROR });
    } catch (err) {
      dispatch({ type: API_LOADING_ERROR, payload: err.response });
    }
  };
};

const addProductByWarehouse = ({
  id,
  name,
  image,
  price,
  category_id,
  description,
  stock,
  booked_stock,
  weight,
}) => {
  return async (dispatch) => {
    try {
      let formData = new FormData();
      const val = JSON.stringify({
        name,
        price,
        category_id,
        description,
        stock,
        booked_stock,
        weight,
      });
      formData.append("image", image);
      formData.append("data", val);
      const headers = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      await axios.post(`${apiUrl_admin}/add-product/${id}`, formData, headers);
      dispatch(getProductsByWarehouse(id));
      dispatch({ type: API_LOADING_SUCCESS });
    } catch (err) {
      dispatch({ type: API_LOADING_ERROR, payload: err.response });
    }
  };
};

const approveBukti = (payload) => {
  const { transactionId, clickLoad } = payload;
  return async (dispatch) => {
    try {
      dispatch({
        type: NULLIFY_ERROR,
      });

      dispatch({
        type: API_LOADING_START,
      });

      await axios.patch(`${apiUrl_admin}/approve-bukti/${transactionId}`);

      console.log(clickLoad);

      dispatch(getAllTransaction({ clickLoad }));
    } catch (err) {
      dispatch({
        type: API_LOADING_ERROR,
        payload: err.response,
      });
    }
  };
};

const rejectBukti = (payload) => {
  const { transactionId, clickLoad } = payload;
  return async (dispatch) => {
    try {
      dispatch({
        type: NULLIFY_ERROR,
      });

      dispatch({
        type: API_LOADING_START,
      });

      await axios.patch(`${apiUrl_admin}/reject-bukti/${transactionId}`);

      dispatch(getAllTransaction({ clickLoad }));
    } catch (err) {
      dispatch({
        type: API_LOADING_ERROR,
        payload: err.response,
      });
    }
  };
};

const deleteProductAction = (id, ambilWarehouse) => {
  return async (dispatch) => {
    try {
      dispatch({ type: API_LOADING_START });
      await axios.delete(`${apiUrl_admin}/delete/${id}`);
      dispatch(getProductsByWarehouse(ambilWarehouse));
      dispatch({ type: API_LOADING_SUCCESS });
    } catch (err) {
      dispatch({ type: API_LOADING_ERROR, payload: err.response });
    }
  };
};

const editProductAction = ({
  ambilWarehouse,
  id,
  name,
  price,
  category_id,
  description,
  stock,
  booked_stock,
  weight,
  image,
}) => {
  return async (dispatch) => {
    try {
      dispatch({ type: API_LOADING_START });

      let formData = new FormData();
      const val = JSON.stringify({
        name,
        price,
        category_id,
        description,
        stock,
        booked_stock,
        weight,
      });
      formData.append("image", image);
      formData.append("data", val);

      const headers = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      await axios.patch(
        `${apiUrl_admin}/edit-product/${id}`,
        formData,
        headers
      );
      dispatch(getProductsByWarehouse(ambilWarehouse));
      dispatch({ type: API_LOADING_SUCCESS });
    } catch (err) {
      dispatch({ type: API_LOADING_ERROR, payload: err.response });
    }
  };
};

const kirimBarang = (payload) => {
  const { transactionId, stockData, clickLoad } = payload;
  return async (dispatch) => {
    try {
      dispatch({
        type: NULLIFY_ERROR,
      });

      dispatch({
        type: API_LOADING_START,
      });

      await axios.patch(
        `${apiUrl_admin}/kirim-barang/${transactionId}`,
        stockData
      );

      dispatch(getAllTransaction({ clickLoad }));
    } catch (err) {
      dispatch({
        type: API_LOADING_ERROR,
        payload: err.response,
      });
    }
  };
};

export {
  getDashboard,
  monitoringAction,
  getAllTransaction,
  approveBukti,
  rejectBukti,
  kirimBarang,
  getProductsByWarehouse,
  fetchWarehouse,
  addProductByWarehouse,
  deleteProductAction,
  editProductAction,
};
