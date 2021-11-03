import axios, { AxiosResponse } from "axios";
import Point from "../common/Point";
import StringDictionary from "../common/stringDictionary";
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
        const response = await axios.post<StringDictionary<number>>(`http://young-hollows-93061.herokuapp.com/predict`, request, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result: Point[] = Object.keys(response.data).map((key: string) => { return { x: parseFloat(key), y: response.data[key] } as Point });

        return result;
    }
}

export default SurvivalCalculator;