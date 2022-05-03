import {
  GET_PRODUCTS,
  GET_PRODUCT,
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  ERROR,
} from '../actions/productActions';

const initialState = {
  productos: [],
  producto: [],
  status: '',

};
function productReducer( state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state, productos: action.payload };
    case GET_PRODUCT:
      return { ...state, producto: action.payload };
    case CREATE_PRODUCT:
      return { ...state, status: action.payload };
    case DELETE_PRODUCT:
      return { ...state, status: action.payload };
    case ERROR:
      return { ...state, status: action.payload };

    default:
      return { ...state };
  }
}
export default productReducer;
