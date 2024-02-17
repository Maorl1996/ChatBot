// reducers/index.js
import { combineReducers } from "redux";
import messagesReducer from "./slices/messagesSlice";
import userReducer from "./slices/usersSlice";
import threadReducer from "./slices/threadSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    messages: messagesReducer,
    thread: threadReducer,
    users: userReducer,
  },
});

export const appReducer = combineReducers({
  messages: messagesReducer,
  thread: threadReducer,
  users: userReducer,
});

const rootReducer = (state: any, action: any) => {
  // Clear all data in redux store to initial.
  if (action.type === "DESTROY_SESSION") {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;

export default store;
