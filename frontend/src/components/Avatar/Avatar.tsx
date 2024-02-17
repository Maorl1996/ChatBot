import React from "react";
// @ts-ignore
import styles from "./Avatar.module.scss";

interface AvatarProps {
  owner: string;
}

const Avatar = ({ owner }: AvatarProps) => {
  const getAcronyms = (name: string) => {
    // Split the input string into words
    const words = name?.split(/\s+/);

    // Extract the first letter of each word and convert to uppercase
    const acronym = words?.map((word) => word.charAt(0).toUpperCase()).join("");

    return acronym;
  };

  return <div className={styles.avatar}>{getAcronyms(owner)}</div>;
};

export default Avatar;
