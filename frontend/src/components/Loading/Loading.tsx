import React from "react";
// @ts-ignore
import styles from "./Loading.module.scss";

const Loading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.chatbot}>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
      </div>
      <div className={styles.chatbotCorner}></div>
      <div className={styles.antenna}>
        <div className={styles.beam}></div>
        <div className={styles.beamPulsar}></div>
      </div>
    </div>
  );
};

export default Loading;
