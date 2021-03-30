const { default: axios } = require("axios");
const {
  apiDaerah_kota,
  apiDaerah_provinsi,
  apiDaerah_kecamatan,
  apiDaerah_kelurahan,
} = require("../../helpers");
const {
  API_LOADING_START,
  NULLIFY_ERROR,
  API_LOADING_SUCCESS,
  API_LOADING_ERROR,
  RESET_INITIAL_STATE,
  GET_DATA_DAERAH,
} = require("../types");

const getProvinsi = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: NULLIFY_ERROR,
      });

      dispatch({
        type: API_LOADING_START,
        payload: { isFinished: false },
      });

      const response = await axios.get(`${apiDaerah_provinsi}`);
      const { provinsi } = response.data;

      dispatch({
        type: GET_DATA_DAERAH,
        payload: { provinsi },
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

const getKota = (payload) => {
  const { provinsiId } = payload;
  return async (dispatch) => {
    try {
      dispatch({
        type: NULLIFY_ERROR,
      });

      dispatch({
        type: API_LOADING_START,
      });

      const response = await axios.get(
        `${apiDaerah_kota}?id_provinsi=${provinsiId}`
      );
      const kota = response.data.kota_kabupaten;

      dispatch({
        type: GET_DATA_DAERAH,
        payload: { kota },
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

const getKecamatan = (payload) => {
  const { kotaId } = payload;
  return async (dispatch) => {
    try {
      dispatch({
        type: NULLIFY_ERROR,
      });

      dispatch({
        type: API_LOADING_START,
      });

      const response = await axios.get(
        `${apiDaerah_kecamatan}?id_kota=${kotaId}`
      );
      const kecamatan = response.data.kecamatan;

      dispatch({
        type: GET_DATA_DAERAH,
        payload: { kecamatan },
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

const getKelurahan = (payload) => {
  const { kecamatanId } = payload;
  return async (dispatch) => {
    try {
      dispatch({
        type: NULLIFY_ERROR,
      });

      dispatch({
        type: API_LOADING_START,
      });

      const response = await axios.get(
        `${apiDaerah_kelurahan}?id_kecamatan=${kecamatanId}`
      );
      const kelurahan = response.data.kelurahan;

      dispatch({
        type: GET_DATA_DAERAH,
        payload: { kelurahan },
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

const resetData = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: NULLIFY_ERROR,
      });
      dispatch({
        type: API_LOADING_START,
      });
      dispatch({
        type: RESET_INITIAL_STATE,
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

export { getProvinsi, getKota, getKecamatan, getKelurahan, resetData };
