import React from 'react';
import styles from './UserInfo.module.scss';
import { _BASE_URL } from '../../utils/constants';

export const UserInfo = ({ avatarUrl, name, additionalText }) => {
  const avatar = _BASE_URL + avatarUrl;
  const defaultAvatar = '../images/no_avatar.png';

  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={avatar || defaultAvatar} alt={name} />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{name}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
};
