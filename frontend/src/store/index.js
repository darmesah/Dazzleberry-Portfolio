import { configureStore } from "@reduxjs/toolkit";

import uiReducer from "./ui-slice";
import allReducer from "./all-slice";

const store = configureStore({ reducer: { ui: uiReducer, all: allReducer } });

export default store;
