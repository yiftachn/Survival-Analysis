import { useTheme } from '@emotion/react';
import { Button } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { useHistory } from 'react-router-dom';
import useRxSubscription from '../../hooks/useRxSubscription';
import FormStore from '../../store/FormStore';
import styles from "./LoadingScreen.module.scss";

const LoadingScreen: FC = () => {
    // @ts-ignore
    const { palette } = useTheme();
    const [dotNumbers, setDotNumbers] = useState(0);
    const [patientId] = useRxSubscription(FormStore.patientId);
    const history = useHistory();

    useEffect(() => {
        const interval = setInterval(() => {
            const nextDotNumbers = dotNumbers >= 3 ? 0 : dotNumbers + 1;
            setDotNumbers(nextDotNumbers);
        }, 600);

        return () => clearInterval(interval);
    }, [dotNumbers]);

    const dots = ".".repeat(dotNumbers);

    const clickGoBack = () => {
        history.push('/');
    };

    return (
        <div className={styles.container}>
            <Loader type="TailSpin" color={palette.primary.main} width={100} height={100} />
            <p className={styles.calculatingText}>Calculating Survival Analysis for {patientId + dots}</p>
            <Button color="secondary" variant="contained" onClick={clickGoBack} fullWidth>Back</Button>
        </div >
    );
};

export default LoadingScreen;