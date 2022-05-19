import { ADD_META_ORDER, ERROR, GET_META_ORDERS, GET_META_USER_ORDERS, PUT_META_ORDER } from '../actions/metamaskActions';
  
  const initialState = {
    status: '',
  };
  function metamaskReducer( state = initialState, action) {
    switch (action.type) {
      case ADD_META_ORDER:
        return { ...state, status: action.payload };
      case GET_META_ORDERS:
        return { ...state, status: action.payload };
      case GET_META_USER_ORDERS:
        return { ...state, status: action.payload };
      case PUT_META_ORDER:
        return { ...state, status: action.payload };
    

      case ERROR:
        return { ...state, status: action.payload };
  
      default:
        return { ...state };
    }
  }
  export default metamaskReducer;
  