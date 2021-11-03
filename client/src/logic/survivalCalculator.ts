import axios from "axios";
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

    public calculateSurvival = async (request: SurgeryAnalysisRequest): Promise<any> => {
        const response = await axios.get(`http://localhost:5000/predict`, {
            params: {
                weight: request.features.weight,
                gender: request.features.gender,
                age: request.features.age
            },
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        });

        return response;
    }
}

export default SurvivalCalculator;