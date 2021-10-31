import React, { FC } from 'react';
import styles from './Logo.module.scss';

const Logo: FC = () => {
    return (
        <div className={styles.container} color="primary">
            Survival Analysis
        </div>
    );
};

export default Logo;
