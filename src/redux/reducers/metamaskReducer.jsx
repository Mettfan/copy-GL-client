import { ADD_META_ORDER, ERROR, GET_META_ORDERS, GET_META_USER_ORDERS, PUT_META_ORDER } from '../actions/metamaskActions';
  
  const initialState = {
    order: "",
    ordersUser:"",
    status: '',
  };
  function metamaskReducer( state = initialState, action) {
    /* console.log('metaAction', action.payload) */
    switch (action.type) {
      case ADD_META_ORDER:
        return { ...state, order: action.payload };
      case GET_META_ORDERS:
        return { ...state, status: action.payload };
      case GET_META_USER_ORDERS:
        return { ...state, ordersUser: action.payload };
      case PUT_META_ORDER:
        return { ...state };
    

      case ERROR:
        return { ...state, status: action.payload };
  
      default:
        return { ...state };
    }
  }
  export default metamaskReducer;