import { createSlice } from "@reduxjs/toolkit";
import { MessageDetails } from "components/Message/Message.types";
import { RootState } from "redux/store";
import _ from "lodash";

const initialState = {
  shouldOpenThread: false,
  messageId: "",
  replies: [] as MessageDetails[],
  suggestions: [] as MessageDetails[],
};

const threadSlice = createSlice({
  name: "thread",
  initialState,
  reducers: {
    setOpenThread: (state, action) => {
      state.shouldOpenThread = action.payload;
    },
    setMessageId: (state, action) => {
      state.messageId = action.payload;
    },
    setReplies: (state, action) => {
      const repliesDictionary = _.keyBy(state.replies || [], "id");
      if (action.payload) {
        const newReplies = [...action.payload];
        const updatedMessages = newReplies?.filter(
          (reply) => !repliesDictionary[reply.id]
        );
        state.replies = [...(state.replies || []), ...updatedMessages];
      }
    },
    initReplies: (state, action) => {
      state.replies = [];
    },
    setSuggestions: (state, action) => {
      state.suggestions = action.payload;
    },
  },
});

export const threadSelector = (state: RootState) => state.thread;

export const {
  setOpenThread,
  setMessageId,
  setReplies,
  initReplies,
  setSuggestions,
} = threadSlice.actions;

export default threadSlice.reducer;
