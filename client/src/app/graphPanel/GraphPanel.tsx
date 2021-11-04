import PieChart from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import { Box, Button, Grid } from "@mui/material";
import React, { FC } from "react";
import { toPng } from "html-to-image";
import download from "downloadjs";
import SaveIcon from '@mui/icons-material/Save';
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

    const downloadScreenshot = async () => {
        const root = document.getElementById("root");
        if (root != null) {
            const dataUrl = await toPng(root);
            const date = new Date().toLocaleDateString('en-CA', { timeZone: "Asia/Jerusalem" });
            download(dataUrl, `${patinetId}_Survival_Analysis_${date}`);
        }
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <div className={styles.container}>
                <BackButton />
                <PieChart highcharts={Highcharts} options={histogrmOpionsCreator.GetHistogramOptions()} />
                <Button color="secondary" variant="contained" onClick={downloadScreenshot} fullWidth>Save as Image <SaveIcon /></Button>
            </div>
        </Box>
    );
};

export default GraphPanel;