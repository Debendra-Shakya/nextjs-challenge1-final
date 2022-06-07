import { HYDRATE,createWrapper } from "next-redux-wrapper";
import { configureStore,combineReducers } from "@reduxjs/toolkit";
import formReducer from'./formSlice';
import topTrackReducer from './topTrackSlice'
const combinedReducer = combineReducers({
    formReducer,
    topTrackReducer,

  });

//   const masterReducer = (state, action) => {
//     if (action.type === HYDRATE) {
//         const nextState = {
//             ...state, // use previous state
//             TopTrack: {
//                 data: [...action.payload.users.users, ...state.users.users]
//             },
//             users: {
//                 users: [...action.payload.users.users, ...state.users.users]
//             }
//         }
//         return nextState;
//     } else {
//     return combinedReducer(state, action)
//   }
// }

export const makestore =()=> configureStore({
    reducer:{
        form:formReducer,
        topTrack:topTrackReducer,
    }
})

export const wrapper = createWrapper(makestore, { debug: true });