type FeatureDetails = {
    name: string;
    description: string;
    validation: (value: string) => boolean;
}

export default FeatureDetails;