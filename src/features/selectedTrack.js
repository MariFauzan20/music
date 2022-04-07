import { createSlice } from "@reduxjs/toolkit";

export const selectedTracks = createSlice({
  name: "selectedTracks",
  initialState: {
    tracks: [],
  },
  reducers: {
    selected: (state, action) => {
      state.tracks = action.payload.tracks;
    },
  },
});

export const { selected } = selectedTracks.actions;

export default selectedTracks.reducer;
