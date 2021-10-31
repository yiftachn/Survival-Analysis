import { FeatureType, postSurgeryFeatures, preperationFeatures, surgeryFeatures } from "./featureMetadata";
import { SurgeryStep } from "./surgeryStep";

const stepToFeatures: { [_ in SurgeryStep]: FeatureType[] } = {
    preparation: preperationFeatures.map(_ => _),
    surgery: surgeryFeatures.map(_ => _),
    postSurgery: postSurgeryFeatures.map(_ => _)
};

export default stepToFeatures;