import { execFile } from 'child_process';

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

    public calculateSurvival = async (request: SurgeryAnalysisRequest): Promise<string> => {
        const requestAsJson = JSON.stringify(request).replaceAll("\"", "\\\"");
        // await new Promise(resolve => setTimeout(resolve, 3000));



        await execFile("./resources/lol.exe", (err: any, data: any) => {
            console.log(err);
            console.log(data.toString());
        });
        return Promise.resolve(requestAsJson);
    }
}

export default SurvivalCalculator;