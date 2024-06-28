import React from "react";
import styles from "./UserInfo.module.scss";

export const UserInfo = ({ avatarUrl, name, additionalText }) => {
  const defaultAvatar = "../images/no_avatar.png";

  return (
    <div className={styles.root}>
      <img
        className={styles.avatar}
        src={avatarUrl || defaultAvatar}
        alt={name}
      />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{name}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
};
