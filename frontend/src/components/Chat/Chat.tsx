import React from "react";
// @ts-ignore
import styles from "./Chat.module.scss";
import Message from "components/Message/Message";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { MessageDetails, SendBy } from "components/Message/Message.types";

const Chat = () => {
  const messages = useSelector<RootState, any>(
    (state) => state.messages?.messages
  );

  const userId = localStorage.getItem("userId");

  return (
    <div className={styles.chat}>
      {messages?.map((messageDetails: MessageDetails) => (
        <Message
          key={messageDetails.id}
          messageDetails={messageDetails}
          sendBy={userId === messageDetails.userId ? SendBy.ME : SendBy.OTHER}
        />
      ))}
    </div>
  );
};

export default Chat;
