import StringDictionary from "../common/stringDictionary";
import { SurgeryStep } from "./surgeryStep";

interface SurgeryAnalysisRequest {
    surgeryStep: SurgeryStep;
    features: StringDictionary<string | null>;
}


export default SurgeryAnalysisRequest;