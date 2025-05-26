import { combineReducers } from "redux";
import authReducer from "./authReducer.js";
import postReducer from "./postReducer.js";
import timelineReducer from "./timelineReducer.js";



export const reducers = combineReducers({ authReducer,timelineReducer,postReducer});
