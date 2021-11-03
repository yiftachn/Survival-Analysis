import StringDictionary from "../common/stringDictionary";
import { SurgeryStep } from "./surgeryStep";

interface SurgeryAnalysisRequest {
    features: StringDictionary<number>;
    model_type: SurgeryStep;
}


export default SurgeryAnalysisRequest;