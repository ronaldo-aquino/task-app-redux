import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import taskReducer from "./taskDucks";
import userReducer from "./userDucks";

const rootReducer = combineReducers({
  user: userReducer,
  taskFirebase: taskReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
}
