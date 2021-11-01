import { BehaviorSubject } from "rxjs";
import StringDictionary from "../common/stringDictionary";
import { SurgeryStep } from "../model/surgeryStep";

class FormStore {
    public static featureValues: BehaviorSubject<StringDictionary<number>> = new BehaviorSubject({});
    public static patientId: BehaviorSubject<string> = new BehaviorSubject("");
    public static surgeryStep: BehaviorSubject<SurgeryStep | null> = new BehaviorSubject<SurgeryStep | null>(null);
}

export default FormStore;