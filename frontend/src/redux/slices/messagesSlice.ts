import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "redux/store";
import _ from "lodash";
import { MessageDetails } from "components/Message/Message.types";

const initialState = {
  messages: [] as MessageDetails[],
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      const messagesDictionary = _.keyBy(state.messages || [], "id");
      if (action.payload) {
        const newMessages = [...action.payload];
        const updatedMessages = newMessages?.filter(
          (message) => !messagesDictionary[message.id]
        );
        state.messages = [...(state.messages || []), ...updatedMessages];
      }
    },
  },
});

export const messagesDictionarySelector = (state: RootState) =>
  _.keyBy(state.messages.messages, "id");

export const { setMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
