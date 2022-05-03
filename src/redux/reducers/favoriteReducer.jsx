import {
    ADD_PRODUCT,
    GET_FAVORITES,
    REMOVE_PRODUCT,
    ERROR,
  } from '../actions/favoritesActions';
  
  const initialState = {
    favorites: [],
    status: '',
  
  };
  function favoriteReducer( state = initialState, action) {
    switch (action.type) {
      case ADD_PRODUCT:
        return { ...state, status: action.payload };
      case GET_FAVORITES:
        return { ...state, status: action.payload, favorites: action.payload?.products || []  };
      case REMOVE_PRODUCT:
        return { ...state, status: action.payload }; 
      case ERROR:
        return { ...state, status: action.payload };
  
      default:
        return { ...state };
    }
  }
  export default favoriteReducer;
  