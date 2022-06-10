import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  error: "",
  data: [],
};

export const getTopTrack = (form) => async (dispatch) => {
  try {
    dispatch(trackStart(true));
    const response = await fetch(
      `http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=${form.country.toLowerCase()}&api_key=b34b1d3084048c33ec1d45bcafbd8c1d&format=json`
    );
    const data = await response.json();

    dispatch(trackSuccess(data.tracks.track.slice(0, form.topNumber)));
    return data.tracks.track;
  } catch {
    // rejectWithValue(error.response.data);

    dispatch(
      trackError(
        `😔\u00A0\u00A0No data found for ${form.country.toUpperCase()} `
      )
    );
  }
};

export const topTrackSlice = createSlice({
  name: "TopTrack",
  initialState,
  reducers: {
    trackStart: (state, action) => {
      state.isLoading = action.payload;
    },
    trackSuccess: (state, action) => {
      state.data = action.payload;
      state.error = false;
      state.isLoading = false;
    },
    trackError: (state, action) => {
      state.data = [];
      state.isLoading = false;
      state.error = action.payload;
    },
  },
  extraReducers: {},
});

export const { trackStart, trackSuccess, trackError } = topTrackSlice.actions;
export default topTrackSlice.reducer;
