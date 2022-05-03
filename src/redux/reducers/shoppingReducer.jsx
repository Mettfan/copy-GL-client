import {
    ADD_PRODUCT,
    GET_SHOPPING,
    RETURN_PRODUCT,
    ERROR,
    EMPTY_SHOPPING,
  } from '../actions/shoppingActions';
  
  const initialState = {
    shopping: [],
    status: '',
  
  };
  function shoppingReducer( state = initialState, action) {
    switch (action.type) {
      case ADD_PRODUCT:
        return { ...state, status: action.payload };
      case GET_SHOPPING:
        return { ...state, status: action.payload, shopping: action.payload?.products || []  };
      case RETURN_PRODUCT:
        return { ...state, status: action.payload };
      case EMPTY_SHOPPING:
        return { ...state, status: action.payload, shopping: [] };

      case ERROR:
        return { ...state, status: action.payload };
  
      default:
        return { ...state };
    }
  }
  export default shoppingReducer;
  