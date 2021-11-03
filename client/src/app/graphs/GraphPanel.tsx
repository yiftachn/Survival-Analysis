import PieChart from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import { Box } from "@mui/material";
import React, { FC } from "react";
import styles from "./GraphPanel.module.scss";
import HistogrmOpionsCreator from "../../logic/histogrmOpionsCreator";
import useRxSubscription from "../../hooks/useRxSubscription";
import GraphStore from "../../store/GraphStore";
import BackButton from '../backButton/BackButton';
import FormStore from '../../store/FormStore';


const GraphPanel: FC = () => {
    const [patinetId] = useRxSubscription(FormStore.patientId);
    const [enrichedScatterPoints] = useRxSubscription(GraphStore.enrichedScatterPoints);
    const histogrmOpionsCreator = new HistogrmOpionsCreator();

    histogrmOpionsCreator.AddTitle(`Survival Percentage for ${patinetId}`).
        SetNumberOFDigitsAfterTheDot(3).
        SetYAxisTitle("Survival Percentage").
        SetXAxisTitle("Month").
        AddLinePoints(GraphStore.linePoints).
        AddScatterPoints(enrichedScatterPoints);

    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <div className={styles.container}>
                <PieChart highcharts={Highcharts} options={histogrmOpionsCreator.GetHistogramOptions()} />
                <BackButton />
            </div>
        </Box>
    );
};

export default GraphPanel;