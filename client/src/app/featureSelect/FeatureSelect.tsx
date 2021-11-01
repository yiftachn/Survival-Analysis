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
}

const FeatureSelect: FC<FormProps> = ({ step }) => {
    const [featureValues, setFeatureValues] = useRxSubscription(FormStore.featureValues);
    const features = useMemo(() => stepToFeatures[step].map(_ => featureToDetails[_]), [step]);
    const [usedFeatures, setUsedFeatures] = useState<FeatureDetails[]>([]);

    useEffect(() => {
        setFeatureValues({} as StringDictionary<number>);
        setUsedFeatures([])
    }, [features]);

    const avaliableFeatures = useMemo(() => features.filter(_ => !usedFeatures.includes(_)), [features, usedFeatures]);

    const onAutoselectSelected = (_: React.SyntheticEvent<Element, Event>, value: FeatureDetails | null) => {
        if (value) {
            setUsedFeatures([...usedFeatures, value]);
        }
    };

    const handleRemove = (feature: FeatureType) => {
        setUsedFeatures(usedFeatures.filter(_ => _.name !== feature));
    };

    const onFeatureValueChanged = (feature: FeatureType, value: number | undefined) => {
        if (value === undefined) {
            const featureValuesWithoutValue = featureValues;
            delete featureValuesWithoutValue[feature];
            setFeatureValues(featureValuesWithoutValue);
        } else {
            setFeatureValues({ ...featureValues, [feature]: value });
        }
    };

    return (
        <div className={styles.container}>
            {usedFeatures.map((feature: FeatureDetails) =>
                <FeatureField key={feature.name} feature={feature} onValueChanged={onFeatureValueChanged} onDelete={handleRemove} />
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
