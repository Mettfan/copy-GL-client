import { ERROR, SUBSCRIBE_FAVORITES, SUBSCRIBE_NEWSLETTER, UNSUBSCRIBE_NEWSLETTER } from "../actions/newsletterActions";

  const initialState = {
    status: '',
  };
  function newsletterReducer ( state = initialState, action) {
    switch (action.type) {
      case SUBSCRIBE_NEWSLETTER:
        return { ...state, status: action.payload };
      case SUBSCRIBE_FAVORITES:
        return { ...state, status: action.payload };
      case UNSUBSCRIBE_NEWSLETTER:
        return { ...state, status: action.payload };

      case ERROR:
        return { ...state, status: action.payload };
  
      default:
        return { ...state };
    }
  }
  export default newsletterReducer;
  