import { Autocomplete, TextField } from "@mui/material";
import React, { FC, useEffect, useMemo, useState } from "react";
import StringDictionary from "../../common/stringDictionary";
import useRxSubscription from "../../hooks/useRxSubscription";
import FeatureDetails from "../../model/featureDetails";
import { featureToDetails, FeatureType } from "../../model/featureMetadata";
import stepToFeatures from "../../model/stepToFeatures";
import { SurgeryStep } from "../../model/surgeryStep";
import FormStore from "../../store/FormStore";
import FeatureField from "../feature/FeatureField";
import styles from "./FeatureSelect.module.scss";

interface FormProps {
    step: SurgeryStep;
    onValidityChanged: (isValid: boolean) => void;
}

const FeatureSelect: FC<FormProps> = ({ step, onValidityChanged }) => {
    const [featuresValidity, setFeatureValidities] = useState<StringDictionary<boolean>>({});
    const [featureValues, setFeatureValues] = useRxSubscription(FormStore.featureValues);

    const features = useMemo(() => stepToFeatures[step].map(_ => featureToDetails[_]), [step]);

    useEffect(() => {
        setFeatureValues({} as StringDictionary<number | undefined>);
        setFeatureValidities({} as StringDictionary<boolean>);
    }, [step]);

    const handleValidityChanged = (featureName: FeatureType, isValid: boolean) => {
        setFeatureValidities({ ...featuresValidity, [featureName]: isValid });
    };

    const onFeatureValueChanged = (feature: FeatureType, value: number | undefined) => {
        if (value !== undefined) {
            setFeatureValues({ ...featureValues, [feature]: value });
        }
    };

    useEffect(() => {
        const validities = Object.values(featuresValidity);
        const isValid = validities.length > 0 && validities.every(_ => _);
        onValidityChanged(isValid);
    }, [featuresValidity, step]);

    return (
        <div className={styles.container}>
            {features.map((feature: FeatureDetails) =>
                <FeatureField
                    key={feature.name}
                    feature={feature}
                    onValueChanged={onFeatureValueChanged}
                    onValidityChanged={handleValidityChanged} />
            )}
        </div>
    );
};

export default FeatureSelect;
