import React, { FC } from 'react';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import styles from './Logo.module.scss';

const Logo: FC = () => {
    return (
        <div className={styles.container} color="primary">
            Survival Analysis <LocalHospitalIcon />
        </div>
    );
};

export default Logo;
