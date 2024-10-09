import { CircularProgress } from '@mui/material';
import React from 'react';
import styles from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={styles.loader}>
      <div>
        <CircularProgress size="50px" />
      </div>
    </div>
  );
};

export default Loader;
