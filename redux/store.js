import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { toastReducer } from "./reducers/toastReducer";
import { authReducer } from "./reducers/authReducer";

export const store = createStore(
  combineReducers({
    toast: toastReducer,
    auth: authReducer,
  }),
  process.env.NODE_ENV === "production"
    ? applyMiddleware(thunk)
    : composeWithDevTools(applyMiddleware(thunk)),
);
