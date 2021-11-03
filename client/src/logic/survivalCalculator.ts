import axios, { AxiosResponse } from "axios";
import Point from "../common/Point";
import SurgeryAnalysisRequest from "../model/surgeryAnalysisRequest";


class SurvivalCalculator {
    private static instance: SurvivalCalculator;

    private constructor() {
        SurvivalCalculator.instance = this;
    }

    public static getInstance(): SurvivalCalculator {
        if (!SurvivalCalculator.instance) {
            SurvivalCalculator.instance = new SurvivalCalculator()
        }

        return SurvivalCalculator.instance;
    }

    public calculateSurvival = async (request: SurgeryAnalysisRequest): Promise<Point[]> => {
        const response = await axios.post<Point[]>(`http://young-hollows-93061.herokuapp.com/predict`, {
            request
        });

        return response.data;
    }
}

export default SurvivalCalculator;