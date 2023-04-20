import { configureStore } from "@reduxjs/toolkit";

import uiReducer from "./ui-slice";
import allReducer from "./all-slice";
import authReducer from "./auth-slice";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    all: allReducer,
    auth: authReducer,
  },
});

export default store;
