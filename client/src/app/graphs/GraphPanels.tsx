import { useHistory } from 'react-router-dom';
import PieChart from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import { Box } from "@mui/material";
import React, { FC } from "react";
import styles from "./GraphPanel.module.scss";
import HistogrmOpionsCreator from "../../logic/HistogrmOpionsCreator";
import useRxSubscription from "../../hooks/useRxSubscription";
import GraphStore from "../../store/GraphStore";
import BackButton from '../backButton/BackButton';


const GraphPanel: FC = () => {
    const [enrichedScatterPoints] = useRxSubscription(GraphStore.enrichedScatterPoints);
    const history = useHistory();
    const histogrmOpionsCreator = new HistogrmOpionsCreator();

    const clickGoBack = () => {
        history.push('/');
    };

    histogrmOpionsCreator.AddTitle("Precentage of survival").
        SetNumberOFDigitsAfterTheDot(3).
        SetYAxisTitle("Percent of survival").
        AddLinePoints(GraphStore.linePoints).
        AddScatterPoints(enrichedScatterPoints);

    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <div className={styles.container}>
                <PieChart highcharts={Highcharts} options={histogrmOpionsCreator.GetHistogramOptions()} />
                <BackButton onBackButtonClicked={clickGoBack} />
            </div>

        </Box>
    );
};

export default GraphPanel;