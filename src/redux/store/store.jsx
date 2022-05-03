import {
  combineReducers, createStore, applyMiddleware, compose,
} from 'redux';
import thunk from 'redux-thunk';
import productReducer from '../reducers/productReducer';
import userReducer from '../reducers/userReducer';
import shoppingReducer from '../reducers/shoppingReducer';
import favoriteReducer from '../reducers/favoriteReducer';

const rootReducer = combineReducers({
  productReducer,
  userReducer,
  shoppingReducer,
  favoriteReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;
