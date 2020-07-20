import {createStore, combineReducers, compose, applyMiddleware} from "redux"
import thunk from 'redux-thunk'
import {userReducer} from "./reducer/userReducer";
import Cookie from "js-cookie";
import { eventReducer } from "./reducer/eventReducer";
import { eventProcessReducer } from "./reducer/eventProcessReducer";
import { findFreeTimeReducer } from "./reducer/findFreetimeReducer";
const userInfo = Cookie.getJSON("userInfo") || null;
const initialState = {signin : {userInfo}, event : {},eventList :[],freetime:{}};

const reducer = combineReducers({
    signin : userReducer,
    event : eventReducer,
    eventList : eventProcessReducer,
    freetime : findFreeTimeReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))
export default store;