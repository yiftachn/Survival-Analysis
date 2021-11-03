import StringDictionary from "../common/stringDictionary";
import { SurgeryStep } from "./surgeryStep";

interface SurgeryAnalysisRequest {
    model_type: SurgeryStep;
    features: StringDictionary<number>;
}


export default SurgeryAnalysisRequest;