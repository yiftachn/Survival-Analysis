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
    const [usedFeatures, setUsedFeatures] = useState<FeatureDetails[]>([]);

    const features = useMemo(() => stepToFeatures[step].map(_ => featureToDetails[_]), [step]);

    useEffect(() => {
        setFeatureValues({} as StringDictionary<number>);
        setFeatureValidities({} as StringDictionary<boolean>);
        setUsedFeatures([])
    }, [step]);

    const removeUnusedFeatureValue = (feature: FeatureType) => {
        const featureValuesWithoutValue = { ...featureValues } as StringDictionary<number>;
        delete featureValuesWithoutValue[feature];
        setFeatureValues(featureValuesWithoutValue);
    }

    const removeUnusedFeatureValidity = (feature: FeatureType) => {
        const featureValiditiesWithoutValue = { ...featuresValidity } as StringDictionary<boolean>;
        delete featureValiditiesWithoutValue[feature];
        setFeatureValidities(featureValiditiesWithoutValue);
    }

    const avaliableFeatures = useMemo(() => features.filter(_ => !usedFeatures.includes(_)), [features, usedFeatures]);

    const onAutoselectSelected = (_: React.SyntheticEvent<Element, Event>, value: FeatureDetails | null) => {
        if (value) {
            setUsedFeatures([...usedFeatures, value]);
        }
    };

    const handleValidityChanged = (featureName: FeatureType, isValid: boolean) => {
        setFeatureValidities({ ...featuresValidity, [featureName]: isValid });
    };

    const handleRemove = (feature: FeatureType) => {
        setUsedFeatures(usedFeatures.filter(_ => _.name !== feature));
        removeUnusedFeatureValue(feature);
        removeUnusedFeatureValidity(feature);
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
            {usedFeatures.map((feature: FeatureDetails) =>
                <FeatureField
                    key={feature.name}
                    feature={feature}
                    onValueChanged={onFeatureValueChanged}
                    onDelete={handleRemove}
                    onValidityChanged={handleValidityChanged} />
            )}

            <Autocomplete
                key={avaliableFeatures.length}
                options={avaliableFeatures}
                clearOnEscape
                onChange={onAutoselectSelected}
                getOptionLabel={(_: FeatureDetails) => _.displayName}
                renderInput={(params) => <TextField {...params} label="Feature Name" />}
            />
        </div>
    )
};

export default FeatureSelect;
