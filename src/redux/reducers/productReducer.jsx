import {
  GET_PRODUCTS,
  GET_PRODUCT,
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  ERROR,
  FILTER_BY_NAME,
  GET_MOST_SELL
} from '../actions/productActions';

const initialState = {
  productos: [],
  productosFilter: [],
  producto: [],
  productosTop: [],
  status: '',

};
function productReducer( state = initialState, action) {
  switch (action.type) {
    case GET_MOST_SELL:
      return { ...state, productosTop: action.payload}
    case GET_PRODUCTS:
      return { ...state, productos: action.payload, productosFilter: action.payload };
    case GET_PRODUCT:
      return { ...state, producto: action.payload };
    case CREATE_PRODUCT:
      return { ...state, status: action.payload };
    case DELETE_PRODUCT:
      return { ...state, status: action.payload };
    case ERROR:
      return { ...state, status: action.payload };

  
  /**
   //!---------        ----------------------------------
   //!--------- PARTE FEA DE LOS FILTROS ----------------------------------
   //!---------         ----------------------------------
   **/
    case FILTER_BY_NAME:
      const TodoslosProds = state.productosFilter
      const filterProdsName = TodoslosProds.filter(el => el.name.toLowerCase().includes(action.payload)) 
      return {
          ...state,
          productos: filterProdsName
      }

    default:
      return { ...state };
  }
}
export default productReducer;
