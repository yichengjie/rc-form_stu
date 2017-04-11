import { combineReducers ,createStore ,applyMiddleware } from 'redux' ;
import thunk from 'redux-thunk';
import baseForm from '../createBaseForm/index.js' ;

export  function createEditPageStore(reducerObj){
    reducerObj = reducerObj || {} ;
    let reducers = combineReducers({
        baseForm,
        ...reducerObj
    }) ;
    return createStore(reducers,applyMiddleware(thunk))  ;
}