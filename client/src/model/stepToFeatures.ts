import { SurgeryStep } from "./surgeryStep";

const stepToFeatures: { [_ in SurgeryStep]: string[] } = {
    preparation: ["1", "2"],
    surgery: ["1", "2", "3"],
    postSurgery: ["1", "2"]
};

export default stepToFeatures;