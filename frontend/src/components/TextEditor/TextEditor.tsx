import React, { useEffect, useState } from "react";
// @ts-ignore
import styles from "./TextEditor.module.scss";
// @ts-ignore
import sendIcon from "../../assets/icons/sendIcon.png";
import MessageApi from "services/api/MessageApi";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../../redux/slices/messagesSlice";
import {
  setReplies,
  setSuggestions,
  threadSelector,
} from "../../redux/slices/threadSlice";
import { io } from "socket.io-client";

interface TextEditorProps {
  sentFromThread?: boolean;
}

const socket = io("http://localhost:8000");

const TextEditor = ({ sentFromThread }: TextEditorProps) => {
  const [message, setMessage] = useState<string>("");
  const thread = useSelector(threadSelector);
  const dispatch = useDispatch();

  const userName = localStorage.getItem("userName");

  useEffect(() => {
    socket.on("chat message", (msg) => {
      console.log("socket:", JSON.stringify(msg));
      if (msg.parentId) {
        return dispatch(setReplies([msg]));
      } else {
        dispatch(setMessages([msg]));
      }
      if (msg.suggestions) {
        dispatch(setSuggestions(msg.suggestions));
      }
      return;
    });
  }, []);

  const postMessage = async () => {
    if (!userName) {
      alert("Please login first");
      return;
    }

    if (!message) return;

    const inputValue = {
      userName,
      userId: localStorage.getItem("userId"),
      message,
      parentId: sentFromThread ? thread?.messageId : null,
    };
    socket.emit("chat message", inputValue);

    setMessage("");
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      postMessage();
    }
  };

  return (
    <div className={styles.container}>
      <input
        onChange={(e) => setMessage(e.target.value)}
        className={styles.textEditor}
        type="text"
        value={message}
        placeholder={"Type your message..."}
        onKeyPress={handleKeyPress}
      />
      <img src={sendIcon} className={styles.sendIcon} onClick={postMessage} />
    </div>
  );
};

export default TextEditor;
