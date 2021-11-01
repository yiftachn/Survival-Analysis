import FeatureDetails from "./featureDetails";
import { IntValidator, IsRequiredValidator } from "./validators";

export const preperationFeatures = ["obesity", "age", "height"] as const;
export const surgeryFeatures = ["age"] as const;
export const postSurgeryFeatures = ["height"] as const;

export type FeatureType = typeof preperationFeatures[number] | typeof surgeryFeatures[number] | typeof postSurgeryFeatures[number];

export const featureToDetails: { [key in FeatureType]: FeatureDetails } = {
    obesity: {
        name: "obesity",
        description: "Obesity is a condition in which excess body fat is distributed throughout the body. It is a common problem in people who are overweight or obese.",
        validators: [IsRequiredValidator, IntValidator]
    },
    age: {
        name: "age",
        description: "Age is a measure of how old someone is. It is measured in years.",
        validators: [IsRequiredValidator, IntValidator]
    },
    height: {
        name: "height",
        description: "Height is a measure of how tall someone is. It is measured in inches.",
        validators: [IsRequiredValidator, IntValidator]
    }
}

