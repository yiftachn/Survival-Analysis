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
        validators: [RequiredValidator, FloatValidator]
    },
    height: {
        name: "height",
        displayName: "Height",
        validators: [RequiredValidator, FloatValidator]
    },
    weight: {
        name: "weight",
        displayName: "Weight",
        validators: [RequiredValidator, FloatValidator]
    },
    BMI: {
        name: "BMI",
        displayName: "BMI",
        validators: [RequiredValidator, FloatValidator]
    },
    gender: {
        name: "gender",
        displayName: "Gender",
        validators: [RequiredValidator, GenderValidator],
        toNumber: (value: string) => value === "M" ? 1 : 0
    }
}

