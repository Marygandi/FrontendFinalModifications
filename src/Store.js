// store.js

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./Components/rootReducer";
import thunk from 'redux-thunk';

const store = configureStore({
  reducer: rootReducer,
});

export default store;
