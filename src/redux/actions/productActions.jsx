import axios from 'axios';
import backurl from '../backurl';
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_PRODUCT = 'GET_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const ERROR = 'ERROR';
/*****
 * FILTROS
 *****/
export const FILTER_BY_NAME = 'FILTER_BY_NAME';

// Habilitada
export const getProducts = () => async (dispatch) => {
  await axios.get(backurl + '/productos').then(
    (response) => {
      dispatch({
        type: GET_PRODUCTS,
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

// No Habilitada
export const getProduct = (id) => async (dispatch) => {
  await axios.get(backurl + `/productos/id/${id}`).then(
    (response) => {
      dispatch({
        type: GET_PRODUCT,
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

export const createProduct = ({ name, description, stock_by_size, price, discount, image, brand, disabled, category, token}) => async (dispatch) => {
  // console.log(token, '<<action token')

  await axios.post(backurl + '/productos', {
    name,
    description,
    stock_by_size,
    price,
    discount,
    image,
    brand,
    disabled,
    category,
    
  },
  {headers: {
    'Authorization': 'Bearer ' + token
  }}
  ).then((response) => {
    dispatch({
      type: CREATE_PRODUCT,
      payload: response.data,
    });
  });
};


// No Habilitada
export const deleteProduct = (id) => async (dispatch) => {
  await axios.delete(backurl + `/producto/${id}`).then(
    (response) => {
      dispatch({
        type: DELETE_PRODUCT,
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
export const editProduct = ({sendData, token}) => async (dispatch) => {
  // console.log(sendData, '<<action>>')
  await axios.put(backurl + '/productos/putproduct', sendData,{headers: {
    'Authorization': 'Bearer ' + token
  }}).then(
      (response) => {
        dispatch({
          type: EDIT_PRODUCT,
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


// FILTROS:

// Prueba...
//export const getProductsbyName = (name) => async (dispatch) => {
//  await axios.get(backurl + `/productos/name/${name}`).then(
//    (response) => {
//      dispatch({
//        type: GET_PRODUCTS,
//        payload: response.data,
//      });
//    },
//    (error) => {
//      dispatch({
//        type: ERROR,
//        payload: error.error,
//      });
//    },
//  );
//};

export function getProductsbyName(payload) {
  return async function (dispatch) {
      try {
          dispatch ({
              type: FILTER_BY_NAME,
              payload,
          });
      }
      catch (error) {
          console.log(error)
      }    
  }
}

// Prueba...
export const getProductsbyBrand = (brand) => async (dispatch) => {
  await axios.get(backurl + `/productos/marca/${brand}`).then(
    (response) => {
      dispatch({
        type: GET_PRODUCTS,
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

// Prueba...
// Usar ASC O DESC en order
export const getProductsbyPrice = (order) => async (dispatch) => {
  await axios.get(backurl + `/productos/price/${order}`).then(
    (response) => {
      dispatch({
        type: GET_PRODUCTS,
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

// Prueba...
export const getProductsbyCategory = (category) => async (dispatch) => {
  await axios.get(backurl + `/productos/categoria/${category}`).then(
    (response) => {
      dispatch({
        type: GET_PRODUCTS,
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

// Prueba...
export const getDiscounts = () => async (dispatch) => {
  await axios.get(backurl + `/productos/discount`).then(
    (response) => {
      dispatch({
        type: GET_PRODUCTS,
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