import { MERCADO_CHECKOUT, ERROR, CHANGE_ORDER_STATE, GET_PAYMENTS, GET_USER_PAYMENTS, GET_AMOUNT_SOLD, GET_QUANTITY_SOLD, GET_SUCCESS, GET_INFO_VIEW } from '../actions/mercadopagoActions';
  
  const initialState = {
    pagos: [],
    price: [],
    amount: [],
    view: [],
    status: '',
    history: [],
  };
  function mercadoReducer( state = initialState, action) {
    switch (action.type) {
      case GET_INFO_VIEW:
        return { ...state, view: action.payload}
      case MERCADO_CHECKOUT:
        return { ...state, status: action.payload };
      case GET_SUCCESS:
        return { ...state, status: action.payload };
      case CHANGE_ORDER_STATE:
        return { ...state, status: action.payload };
      case GET_PAYMENTS:
        return { ...state, pagos: action.payload };
      case GET_USER_PAYMENTS:
        return { ...state, status: action.payload, history: action.payload };
      case GET_QUANTITY_SOLD:
        return { ...state, amount: action.payload };
      case GET_AMOUNT_SOLD:
        return { ...state, price: action.payload };

      case ERROR:
        return { ...state, status: action.payload };
  
      default:
        return { ...state };
    }
  }
  export default mercadoReducer;
  