import { HYDRATE, createWrapper } from "next-redux-wrapper";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import formReducer from "./formSlice";
import topTrackReducer from "./topTrackSlice";

export const makestore = () =>
  configureStore({
    reducer: {
      form: formReducer,
      topTrack: topTrackReducer,
    },
  });

export const wrapper = createWrapper(makestore, { debug: true });
