import axios from 'axios';
import backurl from '../backurl';

export const ADD_PRODUCT = 'ADD_PRODUCT'
export const GET_FAVORITES = 'GET_FAVORITES'
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
export const ERROR = 'ERROR';
export const DELETE_PRODUCT_ID = 'DELETE_PRODUCT_ID';


// Habilitada
export const addfavProduct = ( {email, productId} ) => async (dispatch) => {
  await axios.post( backurl + '/usuario/favorites', { email, productId }).then(
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
export const getFavorites = ( {email} ) => async (dispatch) => {
  await axios.get(backurl + `/usuario/favorites/${email}`).then(
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
export const deletefavProduct = ( {email, productId} ) => async (dispatch) => {
  await axios.delete(backurl + `/usuario/favorites/${email}/${productId}`).then(
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


export const deleteProductAction = () => {
    return function (dispatch){
        dispatch({ 
            type: DELETE_PRODUCT_ID,
            payload: null
        })
    }
}