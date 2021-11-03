import { FeatureType, postSurgeryFeatures, preperationFeatures, surgeryFeatures } from "./featureMetadata";
import { SurgeryStep } from "./surgeryStep";

const stepToFeatures: { [_ in SurgeryStep]: FeatureType[] } = {
    pre: preperationFeatures.map(_ => _),
    intra: surgeryFeatures.map(_ => _),
    post: postSurgeryFeatures.map(_ => _)
};

export default stepToFeatures;