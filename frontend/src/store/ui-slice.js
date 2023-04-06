import { createSlice } from '@reduxjs/toolkit';

const initialUIState = {
  searchBarVisible: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState: initialUIState,
  reducers: {
    showSearchBar(state, action) {
      state.searchBarVisible = true;
    },
    hideSearchBar(state, action) {
      state.searchBarVisible = false;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
