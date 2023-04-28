import { createSlice } from "@reduxjs/toolkit";

const initialUIState = {
  searchBarVisible: false,
  loading: false,
  logoutbg: false,
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
    toggleModalbg(state, action) {
      if (state.logoutbg) {
        state.logoutbg = false;
      } else {
        state.logoutbg = true;
      }
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
