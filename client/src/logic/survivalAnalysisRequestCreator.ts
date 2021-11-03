import SurgeryAnalysisRequest from "../model/surgeryAnalysisRequest";
import FormStore from "../store/FormStore";

class SurvivalAnalysisRequestCreator {
    private static instance: SurvivalAnalysisRequestCreator;

    private constructor() {
        SurvivalAnalysisRequestCreator.instance = this;
    }

    public static getInstance(): SurvivalAnalysisRequestCreator {
        if (!SurvivalAnalysisRequestCreator.instance) {
            SurvivalAnalysisRequestCreator.instance = new SurvivalAnalysisRequestCreator()
        }

        return SurvivalAnalysisRequestCreator.instance;
    }

    public createRequest = () => {
        const surgeryStep = FormStore.surgeryStep.value;

        if (surgeryStep === undefined)
            throw new Error("Surgery step is undefined");

        const features = FormStore.featureValues.value;

        if (features === undefined || Object.keys(features).length === 0)
            throw new Error("Features are empty");

        const request: SurgeryAnalysisRequest = {
            model_type: surgeryStep,
            features
        };

        return request;
    }
}

export default SurvivalAnalysisRequestCreator;