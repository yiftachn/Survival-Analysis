import FeatureDetails from "./featureDetails";
import { FloatValidator, GenderValidator, RequiredValidator } from "./validators";

export const preperationFeatures = ["age", "gender", "weight", "BMI"] as const;
export const surgeryFeatures = ["age"] as const;
export const postSurgeryFeatures = ["height"] as const;

export type FeatureType = typeof preperationFeatures[number] | typeof surgeryFeatures[number] | typeof postSurgeryFeatures[number];

export const featureToDetails: { [key in FeatureType]: FeatureDetails } = {
    age: {
        name: "age",
        displayName: "Age",
        validators: [FloatValidator]
    },
    height: {
        name: "height",
        displayName: "Height",
        validators: [FloatValidator]
    },
    weight: {
        name: "weight",
        displayName: "Weight",
        validators: [FloatValidator]
    },
    BMI: {
        name: "BMI",
        displayName: "BMI",
        validators: [FloatValidator]
    },
    gender: {
        name: "gender",
        displayName: "Gender",
        validators: [],
        choices: ["Male", "Female"],
        toNumber: (value: string) => value === "Male" ? 1 : 0
    }
}

