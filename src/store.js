import { applyMiddleware, createStore } from 'redux';
import arcticlesReducer from './store/articlesReducer';
import thunk from 'redux-thunk';

const store = createStore(arcticlesReducer, applyMiddleware(thunk));

export default store;