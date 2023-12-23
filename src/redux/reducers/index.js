import { combineReducers } from "redux";
import SearchReducer from "./SearchReducer";


const rootReducer=combineReducers({
    search: SearchReducer
})

export default rootReducer