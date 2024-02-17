import React from "react";
// @ts-ignore
import styles from "./Message.module.scss";
import Avatar from "components/Avatar/Avatar";
import { MessageDetails, SendBy } from "./Message.types";
import moment from "moment";
import { useDispatch } from "react-redux";
import { setMessageId, setOpenThread } from "../../redux/slices/threadSlice";

interface MessageProps {
  messageDetails: MessageDetails;
  sendBy: SendBy;
}

const Message = ({ messageDetails, sendBy }: MessageProps) => {
  const wasSendByMe = sendBy === SendBy.ME;
  const dispatch = useDispatch();

  const handleAnswer = () => {
    dispatch(setOpenThread(true));
    dispatch(setMessageId(messageDetails.id));
  };

  return (
    <div
      className={`${wasSendByMe ? styles.imessageMe : styles.imessageOther} ${
        styles.imessage
      }`}
    >
      <div className={`${wasSendByMe ? styles.rigthSide : styles.leftSide}`}>
        <Avatar owner={messageDetails.userName} />
        <span className={`${wasSendByMe ? styles.fromMe : styles.fromThem}`}>
          {messageDetails.message}
          <div
            className={`${styles.time} ${
              wasSendByMe ? styles.messageByMe : styles.messageByOther
            }`}
          >
            {moment(messageDetails.timestamp).format("HH:mm")}
          </div>
        </span>
      </div>
      {messageDetails.isQuestion && (
        <div
          className={`${
            wasSendByMe ? styles.questionMarkMe : styles.questionMarkOther
          } ${styles.answer}`}
          onClick={handleAnswer}
        >
          answers
        </div>
      )}
    </div>
  );
};

export default Message;
