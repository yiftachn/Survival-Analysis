import { Autocomplete, Box, TextField } from "@mui/material";
import React, { FC, useEffect, useMemo, useState } from "react";
import StringDictionary from "../../common/stringDictionary";
import useRxSubscription from "../../hooks/useRxSubscription";
import { FeatureType } from "../../model/featureMetadata";
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
    const features = useMemo(() => stepToFeatures[step], [step]);
    const [usedFeatures, setUsedFeatures] = useState<FeatureType[]>([]);

    useEffect(() => {
        setFeatureValues({} as StringDictionary<number>);
        setUsedFeatures([])
    }, [features]);

    const avaliableFeatures = useMemo(() => features.filter(_ => !usedFeatures.includes(_)), [features, usedFeatures]);

    const onAutoselectSelected = (_: React.SyntheticEvent<Element, Event>, value: string | null) => {
        if (value) {
            setUsedFeatures([...usedFeatures, value as FeatureType]);
        }
    };

    const handleRemove = (feature: FeatureType) => {
        setUsedFeatures(usedFeatures.filter(f => f !== feature));
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
        <Box component="form">
            <div className={styles.container}>
                {usedFeatures.map((feature: FeatureType) =>
                    <FeatureField key={feature} feature={feature} onValueChanged={onFeatureValueChanged} onDelete={handleRemove} />
                )}

                <Autocomplete
                    key={avaliableFeatures.length}
                    options={avaliableFeatures}
                    clearOnEscape
                    onChange={onAutoselectSelected}
                    renderInput={(params) => <TextField {...params} label="Feature Name" />}
                />
            </div>
        </Box>
    )
};

export default FeatureSelect;
