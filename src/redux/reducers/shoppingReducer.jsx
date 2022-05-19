import {
    ADD_PRODUCT,
    GET_SHOPPING,
    RETURN_PRODUCT,
    ERROR,
    EMPTY_SHOPPING,
    TOTAL_SHOPPING,
    TOTAL_DELETE_SHOPPING
  } from '../actions/shoppingActions';
  
  const initialState = {
    products: [],
    status: '',
    totalShopping:[]
  
  };
  function shoppingReducer( state = initialState, action) {
    switch (action.type) {
      case ADD_PRODUCT:
        return { ...state, status: action.payload };
      case GET_SHOPPING:
        return { ...state, status: action.payload, products: action.payload?.products || []  };
      case RETURN_PRODUCT:
        return { ...state, status: action.payload, products: action.payload?.actualProd };
      case EMPTY_SHOPPING:
        return { ...state, status: action.payload, products: [] };
      case TOTAL_SHOPPING:
        const subtotal = [...state.totalShopping]
        subtotal.splice(action.payload[0], 1, action.payload[1])
        return { 
          ...state, 
          totalShopping: subtotal
        };
      case TOTAL_DELETE_SHOPPING:
        const subtotalDelete = [...state.totalShopping]
        subtotalDelete.splice(action.payload, 1)
        return { 
          ...state, 
          totalShopping: subtotalDelete
        };

      case ERROR:
        return { ...state, status: action.payload };
  
      default:
        return { ...state };
    }
  }
  export default shoppingReducer;
  