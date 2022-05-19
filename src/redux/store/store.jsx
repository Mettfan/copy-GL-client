import {
  combineReducers, createStore, applyMiddleware, compose,
} from 'redux';
import thunk from 'redux-thunk';
import productReducer from '../reducers/productReducer';
import userReducer from '../reducers/userReducer';
import shoppingReducer from '../reducers/shoppingReducer';
import favoriteReducer from '../reducers/favoriteReducer';
import mercadoReducer from '../reducers/mercadoReducer';
import metamaskReducer from '../reducers/metamaskReducer';
import reviewReducer from '../reducers/reviewReducer';
import newsletterReducer from '../reducers/newsletterReducer';

const rootReducer = combineReducers({
  productReducer,
  userReducer,
  shoppingReducer,
  favoriteReducer,
  mercadoReducer,
  metamaskReducer,
  reviewReducer,
  newsletterReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;
