import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  error: "",
  data: [],
};

export const getTopTrack=(form)=>async(dispatch)=>
 {
    console.log(form)
    try {
      dispatch(trackStart(true));
      const response= await fetch(`http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=${form.country.toLowerCase()}&api_key=b34b1d3084048c33ec1d45bcafbd8c1d&format=json`
      )
      const data=await response.json();
      // const { data } = await axios.get(
      //   //   "https://baconipsum.com/api/?type=tst"
      //   // "http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=nepal&api_key=b34b1d3084048c33ec1d45bcafbd8c1d&format=json"
      //   `http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=${form.country.toLowerCase()}&api_key=b34b1d3084048c33ec1d45bcafbd8c1d&format=json`
      // );
      console.log("data")
      console.log(data.tracks.track)
      dispatch(trackSuccess(data.tracks.track.slice(0,form.topNumber)))
      return data.tracks.track;
    } catch (error) {
      // rejectWithValue(error.response.data);
      dispatch(trackError(`😔\u00A0\u00A0No data found for ${form.country.toUpperCase()} `))
    }
  //   finally {
  //     dispatch(trackStart(true));
  // }
  };

export const topTrackSlice = createSlice({
  name: "TopTrack",
  initialState,
  reducers: {
    trackStart: (state, action) => {
      // state.isLoading=[...state.isLoading,action.payload]
      state.isLoading = action.payload;
    },
    trackSuccess: (state, action) => {
      state.data =  action.payload;
      state.error = false;
      state.isLoading=false
    },
    trackError: (state, action) => {
      state.data=[];
      state.error =  action.payload;
    },
  },
  extraReducers: {
    // [getTopTrack.pending]: (state, { payload }) => {
    //   state.isLoading = true;
    // },
    // [getTopTrack.fulfilled]: (state, { payload }) => {
    //   state.isLoading = false;
    //   state.data=payload;
    //   // state.data = [...state.data,payload];
      
    // },
    // [getTopTrack.rejected]: (state, { payload }) => {
    //   state.error = payload;
    //   state.isLoading=false;
    // },
  },
});

export const { trackStart, trackSuccess, trackError } = topTrackSlice.actions;
export default topTrackSlice.reducer;
