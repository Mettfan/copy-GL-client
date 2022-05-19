import axios from 'axios';

export const MERCADO_CHECKOUT = 'MERCADO_CHECKOUT';
export const CHANGE_ORDER_STATE = 'CHANGE_ORDER_STATE';
export const GET_PAYMENTS = 'GET_PAYMENTS';
export const GET_USER_PAYMENTS = 'GET_USER_PAYMENTS';
export const GET_QUANTITY_SOLD = 'GET_QUANTITY_SOLD';
export const GET_AMOUNT_SOLD = 'GET_AMOUNT_SOLD';
export const GET_SUCCESS = 'GET_SUCCESS';
export const SUCCESS = 'SUCCESS';

export const ERROR = 'ERROR';

// Habilitada
export const mercadoCheckout = ({
    name, picture_url, size, price, quantity
}) => async (dispatch) => {
  console.log('name,picture_url, size, price, quantity', name,picture_url, size, price, quantity)
  await axios.post('http://localhost:3001/mercado/checkout', {
      name,
      picture_url,
      size,
      price,
      quantity
  }).then(
    (response) => {
      dispatch({
        type: MERCADO_CHECKOUT,
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
export const changeOrderState = ({
    id, state
}) => async (dispatch) => {
  await axios.put('http://localhost:3001/mercado/state', {
      id,
      state
  }).then(
    (response) => {
      dispatch({
        type: CHANGE_ORDER_STATE,
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
export const getPayments = () => async (dispatch) => {
  await axios.get('http://localhost:3001/mercado/payments').then(
    (response) => {
      dispatch({
        type: GET_PAYMENTS,
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
export const successMP = ({
  payment_id, email
}) => async (dispatch) => {
  await axios.get(`http://localhost:3001/mercado/success?payment_id=${payment_id}&email=${email}`).then(
    (response) => {
      dispatch({
        type: SUCCESS,
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
export const getUserPayments = (email) => async (dispatch) => {
  await axios.get(`http://localhost:3001/mercado/history/${email}`).then(
    (response) => {
      dispatch({
        type: GET_USER_PAYMENTS,
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
export const getQuantitySold = () => async (dispatch) => {
  await axios.get(`http://localhost:3001/mercado/amount`).then(
    (response) => {
      dispatch({
        type: GET_QUANTITY_SOLD,
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
export const getAmountSold = () => async (dispatch) => {
  await axios.get(`http://localhost:3001/mercado/price`).then(
    (response) => {
      dispatch({
        type: GET_AMOUNT_SOLD,
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

export const getSuccess = (payment_id) => async (dispatch) => {
  await axios.get(`http://localhost:3001/mercado/success?payment_id=${payment_id}`).then(
    (response) => {
      dispatch({
        type: GET_SUCCESS,
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


