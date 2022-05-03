import axios from 'axios';

export const ADD_PRODUCT = 'ADD_PRODUCT'
export const GET_FAVORITES = 'GET_FAVORITES'
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
export const ERROR = 'ERROR';

// Habilitada
export const addfavProduct = ( email, productId ) => async (dispatch) => {
  await axios.post('http://localhost:3001/usuario/favorites', { email, productId }).then(
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
export const getFavorites = ( email ) => async (dispatch) => {
  await axios.get(`http://localhost:3001/usuario/favorites/${email}`).then(
    (response) => {
      dispatch({
        type: GET_FAVORITES,
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
export const deletefavProduct = ( email, productId ) => async (dispatch) => {
  await axios.delete(`http://localhost:3001/usuario/shoppingcart/${email}/${productId}`).then(
    (response) => {
      dispatch({
        type: REMOVE_PRODUCT,
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

