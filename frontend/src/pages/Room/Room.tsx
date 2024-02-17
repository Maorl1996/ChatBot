import React, { useEffect, useState } from "react";
import RoomHeader from "../../components/RoomHeader/RoomHeader";
import TextEditor from "components/TextEditor/TextEditor";
// @ts-ignore
import styles from "./Room.module.scss";
import Chat from "components/Chat/Chat";
import io from "socket.io-client";
import MessageApi from "services/api/MessageApi";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../../redux/slices/messagesSlice";
import LoginDialog from "components/LoginDialog/LoginDialog";
import { RootState } from "redux/store";
import { MessageDetails } from "components/Message/Message.types";
import Thread from "components/Thread/Thread";
import { threadSelector } from "../../redux/slices/threadSlice";
import _ from "lodash";
import { normalizedMessages } from "../../tools/utils";

const Room = () => {
  // const socket = io("http://localhost:8000");
  // Example: Sending a message from frontend to backend
  // socket.emit("chat message", "Hello from the frontend!");

  // Example: Receiving a message from backend
  // socket.on("chat message", (msg) => {
  //   console.log("Message from server:", msg);
  // });
  const getconnection = () => {};

  const dispatch = useDispatch();
  const localStorageUser = localStorage.getItem("userId");
  const messagesStore = useSelector<RootState, MessageDetails[]>(
    (state) => state.messages?.messages
  );

  const thread = useSelector(threadSelector);

  const [shouldOpenLoginDialog, setShouldOpenLoginDialog] = useState<boolean>(
    !localStorageUser
  );

  const fetchMessages = async () => {
    if (messagesStore?.length) return;
    const messages = await MessageApi.fetchMessages();

    if (!messages) return;

    const _normalizedMessages = normalizedMessages(messages);
    dispatch(setMessages(_normalizedMessages));
  };

  useEffect(() => {
    getconnection();
    console.log("room");
    fetchMessages();
  }, []);

  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.container}>
          <RoomHeader />
          <Chat />
          <TextEditor />
        </div>
        {thread.shouldOpenThread && (
          <div className={styles.threadDraw}>
            <Thread />
          </div>
        )}
      </div>
      {shouldOpenLoginDialog && (
        <LoginDialog
          isOpen={shouldOpenLoginDialog}
          onClose={() => setShouldOpenLoginDialog(false)}
        />
      )}
    </>
  );
};

export default Room;
