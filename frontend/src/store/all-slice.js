import { createSlice } from "@reduxjs/toolkit";

const initialAllState = {
  page: 1,
  workItems: [],
  sort: "",
};

const allSlice = createSlice({
  name: "all",
  initialState: initialAllState,
  reducers: {
    loadWorkItems(state, action) {
      state.workItems = [];
      state.page = 1;
    },
    loadMore(state, action) {
      state.page += 1;
    },
    setWorkItems(state, action) {
      if (state.page === 1) {
        state.workItems = action.payload;
      } else {
        state.workItems = [...state.workItems, ...action.payload];
      }
    },
    sortAlpha(state, action) {
      if (state.sort !== "asc") {
        state.page = 1;
        state.sort = "asc";
        state.workItems = [];
      }
    },
    sortChro(state, action) {
      if (state.sort !== "") {
        state.page = 1;
        state.sort = "";
        state.workItems = [];
      }
    },
  },
});

export const allActions = allSlice.actions;

export default allSlice.reducer;
