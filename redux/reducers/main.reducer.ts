import {combineReducers} from "redux";
import userReducer from "./user.reducer";
import nasaDataReducer from "./nasa-data.reducer";

const mainReducer = combineReducers({user: userReducer, nasaData: nasaDataReducer})

export default mainReducer;
