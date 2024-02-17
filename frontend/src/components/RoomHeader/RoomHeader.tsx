import React from "react";
// @ts-ignore
import chatBot from "../../assets/icons/chatbot.png";
// @ts-ignore
import styles from "./RoomHeader.module.scss";

const RoomHeader = () => {
  return (
    <div className={styles.header}>
      <img src={chatBot} alt="chatbot" className={styles.botIcon} />
      <span className={styles.title}>ChatBot</span>
    </div>
  );
};

export default RoomHeader;
