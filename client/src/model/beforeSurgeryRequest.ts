import StringDictionary from "../common/stringDictionary";
import { SurgeryStep } from "./surgeryStep";

interface SurgeryAnalysisRequest {
    patientId: string;
    surgeryStep: SurgeryStep;
    features: StringDictionary<string>;
}


export default SurgeryAnalysisRequest;