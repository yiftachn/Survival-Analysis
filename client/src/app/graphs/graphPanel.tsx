import PieChart from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import { Box } from "@mui/material";
import React, { FC } from "react";
import styles from "./GraphPanel.module.scss";
import HistogrmOpionsCreator from "./HistogrmOpionsCreator";
import useRxSubscription from "../../hooks/useRxSubscription";
import GraphStore from "../../store/GraphStore";

const GraphPanel: FC = () => {
    const [enrichedScatterPoints] = useRxSubscription(GraphStore.enrichedScatterPoints);

    const histogrmOpionsCreator = new HistogrmOpionsCreator();

    histogrmOpionsCreator.AddTitle("Precentage of survival").
    SetNumberOFDigitsAfterTheDot(3).
    SetYAxisTitle("Percent of survival").
    AddLinePoints(GraphStore.linePoints).
    AddScatterPoints(enrichedScatterPoints);

    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <div className={styles.container}>
                    <PieChart highcharts={Highcharts} options={histogrmOpionsCreator.GetHistogramOptions()} />
            </div>
        </Box>
    );
};

export default GraphPanel;