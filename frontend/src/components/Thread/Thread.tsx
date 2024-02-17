import React, { useEffect, useState } from "react";
// @ts-ignore
import xIcon from "../../assets/icons/x-icon.png";
// @ts-ignore
import styles from "./Thread.module.scss";
import { useDispatch } from "react-redux";
import {
  initReplies,
  setMessageId,
  setOpenThread,
  setReplies,
  threadSelector,
} from "../../redux/slices/threadSlice";
import { useSelector } from "react-redux";
import { messagesDictionarySelector } from "../../redux/slices/messagesSlice";
import TextEditor from "components/TextEditor/TextEditor";
import MessageApi from "services/api/MessageApi";
import { MessageDetails } from "components/Message/Message.types";
import Avatar from "components/Avatar/Avatar";
import { normalizedMessages } from "../../tools/utils";
import moment from "moment";
import Skeleton from "@mui/material/Skeleton";
// @ts-ignore
import robotIcon from "../../assets/icons/robot.png";

const Thread = () => {
  const dispatch = useDispatch();
  const thread = useSelector(threadSelector);
  const messagesDictionary = useSelector(messagesDictionarySelector);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const closeThread = () => {
    dispatch(setOpenThread(false));
    dispatch(setMessageId(null));
    dispatch(initReplies(null));
  };

  const getReplies = async () => {
    try {
      setIsLoading(true);
      const replies = await MessageApi.getReplies(thread.messageId);
      const _normalizedMessages = normalizedMessages(replies);

      dispatch(setReplies(_normalizedMessages));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getReplies();

    return () => {
      dispatch(initReplies(null));
    };
  }, [thread.messageId]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Thread</h1>
        <img
          src={xIcon}
          alt="Thread"
          className={styles.close}
          onClick={closeThread}
        />
      </div>
      <div className={styles.question}>
        {messagesDictionary[thread.messageId]?.message}
      </div>
      <div className={styles.answers}>
        {isLoading ? (
          <RepliesSkelton />
        ) : (
          thread.replies?.map((reply: MessageDetails) => {
            return (
              <div className={styles.answer} key={reply.id}>
                <div className={styles.leftSide}>
                  <Avatar owner={reply.userName} />
                  <span>{reply.message}</span>
                </div>
                <div>{moment(reply.timestamp).format("HH:mm")}</div>
              </div>
            );
          })
        )}
      </div>
      {!!thread.suggestions?.length && (
        <div className={styles.suggestions}>
          {thread.suggestions?.map((suggestion: MessageDetails) => {
            return (
              <div className={styles.suggestion} key={suggestion.id}>
                <img src={robotIcon} width={20} height={20} />

                <span>{suggestion.message}</span>
              </div>
            );
          })}
        </div>
      )}
      <div className={styles.addReply}>
        <TextEditor sentFromThread />
      </div>
    </div>
  );
};

const RepliesSkelton = () => {
  return (
    <div>
      <div className={styles.skeleton}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="text" className={styles.text} />
      </div>
      <div className={styles.skeleton}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="text" className={styles.text} />
      </div>
      <div className={styles.skeleton}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="text" className={styles.text} />
      </div>
      <div className={styles.skeleton}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="text" className={styles.text} />
      </div>
    </div>
  );
};

export default Thread;
