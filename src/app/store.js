import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import selectedTracksReducer from "../features/selectedTrack";

export default configureStore({
  reducer: {
    auth: authReducer,
    selectedTracks: selectedTracksReducer,
  },
});
