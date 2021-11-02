import { BehaviorSubject } from "rxjs";
import StringDictionary from "../common/stringDictionary";
import { SurgeryStep } from "../model/surgeryStep";

class FormStore {
    public static featureValues: BehaviorSubject<StringDictionary<string>> = new BehaviorSubject({});
    public static patientId: BehaviorSubject<string> = new BehaviorSubject("");
    public static surgeryStep: BehaviorSubject<SurgeryStep | undefined> = new BehaviorSubject<SurgeryStep | undefined>(undefined);

    public static reset() {
        FormStore.featureValues.next({});
        FormStore.patientId.next("");
        FormStore.surgeryStep.next(undefined);
    }
}

export default FormStore;