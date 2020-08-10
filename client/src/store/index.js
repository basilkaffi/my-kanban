import { createStore, combineReducers, applyMiddleware } from 'redux';
import crudReducer from './reducers/crudReducer';
import enterReducer from './reducers/enterReducer';
import  thunk from 'redux-thunk';

const reducer = combineReducers({
  crudReducer,
  enterReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store