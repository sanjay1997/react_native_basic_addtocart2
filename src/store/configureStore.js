import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import listReducer from '../reducers/listReducer';

const rootReducer = combineReducers({
    listReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));