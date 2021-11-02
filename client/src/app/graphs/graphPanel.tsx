import PieChart from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import { Box } from "@mui/material";
import React, { FC } from "react";
import styles from "./GraphPanel.module.scss";
import HistogrmOpionsCreator from "./HistogrmOpionsCreator";
import Point from "../../common/Point";

interface GraphProps {
    linePoints: Point[];
    scatterPoints: Point[];
}

const PieGraph: FC<GraphProps> = ({ linePoints, scatterPoints }) => {
    const histogrmOpionsCreator = new HistogrmOpionsCreator();

    histogrmOpionsCreator.AddTitle("Precentage of survival").
    SetNumberOFDigitsAfterTheDot(3).
    SetYAxisTitle("Percent of survival").
    AddLinePoints(linePoints).
    AddScatterPoints(scatterPoints);

    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <div className={styles.container}>
                    <PieChart highcharts={Highcharts} options={histogrmOpionsCreator.GetHistogramOptions()} />
            </div>
        </Box>
    );
};

export default PieGraph;