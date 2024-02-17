import React from "react";
// @ts-ignore
import styles from "./SendMessageButton.module.scss";
// @ts-ignore
import sendIcon from "../../assets/icons/send.svg";

const SendMessageButton = () => {
  return (
    <div>
      <img src={sendIcon} />
    </div>
  );
};

export default SendMessageButton;
