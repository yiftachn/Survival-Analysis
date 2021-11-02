import SurgeryAnalysisRequest from "../model/surgeryAnalysisRequest";
import FormStore from "../store/FormStore";

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

    private createRequest = () => {
        const surgeryStep = FormStore.surgeryStep.value;

        if (surgeryStep === undefined)
            throw new Error("Surgery step is undefined");

        const request: SurgeryAnalysisRequest = {
            surgeryStep,
            features: FormStore.featureValues.value
        };

        return request;
    }

    public calculateSurvival = async () => {
        const request = this.createRequest();
        await new Promise(resolve => setTimeout(resolve, 3000));
        return Promise.resolve(200);
    }
}

export default SurvivalCalculator;