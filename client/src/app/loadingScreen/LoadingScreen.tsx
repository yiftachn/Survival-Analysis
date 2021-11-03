import { useTheme } from '@emotion/react';
import { Button } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { useHistory } from 'react-router-dom';
import useAsyncEffect from 'use-async-effect';
import Point from '../../common/Point';
import useRxSubscription from '../../hooks/useRxSubscription';
import GraphLogic from '../../logic/GraphLogic';
import SurvivalAnalysisRequestCreator from '../../logic/survivalAnalysisRequestCreator';
import SurvivalCalculator from '../../logic/survivalCalculator';
import FormStore from '../../store/FormStore';
import GraphStore from '../../store/GraphStore';
import styles from "./LoadingScreen.module.scss";

const mockedScatterPoints: Point[] = [
    { x: 3, y: 0.9 },
    { x: 6, y: 0.8 },
    { x: 12, y: 0.7 },
    { x: 36, y: 0.65 }
];

const LoadingScreen: FC = () => {
    // @ts-ignore
    const { palette } = useTheme();
    const requestCreator = SurvivalAnalysisRequestCreator.getInstance();
    const survivalCalculator = SurvivalCalculator.getInstance();
    const [dotNumbers, setDotNumbers] = useState(0);
    const [patientId] = useRxSubscription(FormStore.patientId);
    const history = useHistory();
    const graphLogic = GraphLogic.getInstance();

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

    useAsyncEffect(async (isMounted: () => boolean) => {
        try {
            const request = requestCreator.createRequest();
            // const response = await survivalCalculator.calculateSurvival(request);
            const enrichedScatterPoints = graphLogic.getEnrichedSctterPoints(mockedScatterPoints);
            console.log(enrichedScatterPoints);
            GraphStore.enrichedScatterPoints.next(enrichedScatterPoints);
            // console.log(response);
           
            if (isMounted())
                history.push('/result');
        }
        catch (ex: any) {
            window.alert(`Error calculating survival, reason: ${ex.message}`);
            throw ex;
        }
    }, [survivalCalculator, requestCreator, history]);

    return (
        <div className={styles.container}>
            <Loader type="TailSpin" color={palette.primary.main} width={100} height={100} />
            <p className={styles.calculatingText}>Calculating Survival Analysis for {patientId + dots}</p>
            <Button color="secondary" variant="contained" onClick={clickGoBack} fullWidth>Back</Button>
        </div >
    );
};

export default LoadingScreen;