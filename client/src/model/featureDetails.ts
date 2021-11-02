import { FeatureType } from "./featureMetadata";
import { Validator } from "./validators";

type FeatureDetails = {
    name: FeatureType;
    displayName: string;
    validators: Validator[];
    toNumber?: (value: string) => number;
    choices?: string[];
}

export default FeatureDetails;