import { createStore } from "redux";
import rootReducer from "../reducers";
import SearchReducer from "../reducers/SearchReducer";

const store=createStore(SearchReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store