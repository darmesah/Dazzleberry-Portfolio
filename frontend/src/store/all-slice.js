import { createSlice } from "@reduxjs/toolkit";

const initialAllState = {
  page: 2,
  workItems: [],
  sort: "",
};

const allSlice = createSlice({
  name: "all",
  initialState: initialAllState,
  reducers: {
    loadWorkItems(state, action) {
      state.page = 1;
      state.workItems = [];
    },
    loadMore(state, action) {
      state.page += 1;
      state.workItems = [...state.workItems, ...action.payload];
    },
    setWorkItems(state, action) {
      if (state.workItems.length === 0) {
        state.workItems = action.payload;
      }
    },
    sortAlpha(state, action) {
      if (state.sort !== "asc") {
        state.page = 2;
        state.sort = "asc";
        state.workItems = [];
      }
    },
    sortChro(state, action) {
      if (state.sort !== "") {
        state.page = 2;
        state.sort = "";
        state.workItems = [];
      }
    },
  },
});

export const allActions = allSlice.actions;

export default allSlice.reducer;
