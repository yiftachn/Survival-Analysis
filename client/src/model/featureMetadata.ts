import FeatureDetails from "./featureDetails";

export const preperationFeatures = ["obesity", "age", "height"] as const;
export const surgeryFeatures = ["age"] as const;
export const postSurgeryFeatures = ["height"] as const;

export type FeatureType = typeof preperationFeatures[number] | typeof surgeryFeatures[number] | typeof postSurgeryFeatures[number];

const isNumeric = (value: string) => !Number.isNaN(parseFloat(value)) && Number.isFinite(value);

export const featureToDetails: { [key in FeatureType]: FeatureDetails } = {
    obesity: {
        name: "obesity",
        description: "Obesity is a condition in which excess body fat is distributed throughout the body. It is a common problem in people who are overweight or obese.",
        validation: isNumeric
    },
    age: {
        name: "age",
        description: "Age is a measure of how old someone is. It is measured in years.",
        validation: isNumeric
    },
    height: {
        name: "height",
        description: "Height is a measure of how tall someone is. It is measured in inches.",
        validation: isNumeric
    }
}

