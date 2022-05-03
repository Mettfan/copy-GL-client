import axios from 'axios';

export const ADD_PRODUCT = 'ADD_PRODUCT'
export const GET_SHOPPING = 'GET_SHOPPING'
export const RETURN_PRODUCT = 'RETURN_PRODUCT'
export const EMPTY_SHOPPING = 'EMPTY_SHOPPING'
export const ERROR = 'ERROR';

// Habilitada
export const addProduct = ( email, productId ) => async (dispatch) => {
  await axios.post('http://localhost:3001/usuario/shoppingcart', { email, productId }).then(
    (response) => {
      dispatch({
        type: ADD_PRODUCT,
        payload: response.data,
      });
    },
    (error) => {
      dispatch({
        type: ERROR,
        payload: error.error,
      });
    },
  );
};

// Habilitada
export const getShopping = ( email ) => async (dispatch) => {
  await axios.get(`http://localhost:3001/usuario/shoppingcart/${email}`).then(
    (response) => {
      dispatch({
        type: GET_SHOPPING,
        payload: response.data,
      });
    },
    (error) => {
      dispatch({
        type: ERROR,
        payload: error.error,
      });
    },
  );
};

// Habilitada
export const returnProduct = ( email, productId ) => async (dispatch) => {
  await axios.delete(`http://localhost:3001/usuario/shoppingcart/${email}/${productId}`).then(
    (response) => {
      dispatch({
        type: RETURN_PRODUCT,
        payload: response.data,
      });
    },
    (error) => {
      dispatch({
        type: ERROR,
        payload: error.error,
      });
    },
  );
};

// Habilitada
export const emptyShopping = ( email ) => async (dispatch) => {
  await axios.delete(`http://localhost:3001/usuario/deleteshoppingcart/${email}`).then(
    (response) => {
      dispatch({
        type: EMPTY_SHOPPING,
        payload: response.data,
      });
    },
    (error) => {
      dispatch({
        type: ERROR,
        payload: error.error,
      });
    },
  );
};

