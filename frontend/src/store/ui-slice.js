import { createSlice } from "@reduxjs/toolkit";

const initialUIState = {
  searchBarVisible: false,
  loading: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialUIState,
  reducers: {
    showSearchBar(state, action) {
      state.searchBarVisible = true;
    },
    hideSearchBar(state, action) {
      state.searchBarVisible = false;
    },
    setLoading(state, action) {
      state.loading = !state.loading;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
