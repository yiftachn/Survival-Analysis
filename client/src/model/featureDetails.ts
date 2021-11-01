import { Validator } from "./validators";

type FeatureDetails = {
    name: string;
    validators: Validator[];
    toNumber?: (value: string) => number;
}

export default FeatureDetails;