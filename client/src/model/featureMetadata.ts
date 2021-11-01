import FeatureDetails from "./featureDetails";
import { FloatValidator, GenderValidator, RequiredValidator } from "./validators";

export const preperationFeatures = ["age", "gender", "weight", "BMI"] as const;
export const surgeryFeatures = ["age"] as const;
export const postSurgeryFeatures = ["height"] as const;

export type FeatureType = typeof preperationFeatures[number] | typeof surgeryFeatures[number] | typeof postSurgeryFeatures[number];

export const featureToDetails: { [key in FeatureType]: FeatureDetails } = {
    age: {
        name: "age",
        validators: [RequiredValidator, FloatValidator]
    },
    height: {
        name: "height",
        validators: [RequiredValidator, FloatValidator]
    },
    weight: {
        name: "weight",
        validators: [RequiredValidator, FloatValidator]
    },
    BMI: {
        name: "BMI",
        validators: [RequiredValidator, FloatValidator]
    },
    gender: {
        name: "gender",
        validators: [RequiredValidator, GenderValidator],
        toNumber: (value: string) => value === "M" ? 1 : 0
    }
}

