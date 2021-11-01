import { Validator } from "./validators";

type FeatureDetails = {
    name: string;
    description: string;
    validators: Validator[];
}

export default FeatureDetails;