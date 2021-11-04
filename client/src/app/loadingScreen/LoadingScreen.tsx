import { useTheme } from '@emotion/react';
import React, { FC, useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { useHistory } from 'react-router-dom';
import useAsyncEffect from 'use-async-effect';
import useRxSubscription from '../../hooks/useRxSubscription';
import GraphEnricher from '../../logic/GraphEnricher';
import SurvivalAnalysisRequestCreator from '../../logic/survivalAnalysisRequestCreator';
import SurvivalCalculator from '../../logic/survivalCalculator';
import FormStore from '../../store/FormStore';
import GraphStore from '../../store/GraphStore';
import BackButton from '../backButton/BackButton';
import styles from "./LoadingScreen.module.scss";

const LoadingScreen: FC = () => {
    // @ts-ignore
    const { palette } = useTheme();
    const requestCreator = SurvivalAnalysisRequestCreator.getInstance();
    const survivalCalculator = SurvivalCalculator.getInstance();
    const [dotNumbers, setDotNumbers] = useState(0);
    const [patientId] = useRxSubscription(FormStore.patientId);
    const history = useHistory();
    const graphLogic = GraphEnricher.getInstance();

    useEffect(() => {
        const interval = setInterval(() => {
            const nextDotNumbers = dotNumbers >= 3 ? 0 : dotNumbers + 1;
            setDotNumbers(nextDotNumbers);
        }, 600);

        return () => clearInterval(interval);
    }, [dotNumbers]);

    const dots = ".".repeat(dotNumbers);

    useAsyncEffect(async (isMounted: () => boolean) => {
        try {
            const request = requestCreator.createRequest();
            const scatteredPoints = await survivalCalculator.calculateSurvival(request);
            const enrichedScatterPoints = graphLogic.getEnrichedSctterPoints(scatteredPoints);
            console.log(enrichedScatterPoints);
            GraphStore.enrichedScatterPoints.next(enrichedScatterPoints);

            if (isMounted())
                history.push('/result');
        }
        catch (ex: any) {
            window.alert(`Error calculating survival, reason: ${ex.message}`);
            throw ex;
        }
    }, [survivalCalculator, requestCreator, history]);

    return (
        <>

            <div className={styles.container}>
                <BackButton />
                <Loader type="TailSpin" color={palette.primary.main} width={100} height={100} />
                <p className={styles.calculatingText}>Calculating Survival Analysis for {patientId + dots}</p>
            </div >
        </>
    );
};

export default LoadingScreen;