import { Autocomplete, Box, Button, TextField } from "@mui/material";
import React, { FC, useEffect, useMemo, useState } from "react";
import StringDictionary from "../../common/stringDictionary";
import { FeatureType } from "../../model/featureMetadata";
import stepToFeatures from "../../model/stepToFeatures";
import { SurgeryStep } from "../../model/surgeryStep";
import FeatureField from "../feature/FeatureField";
import styles from "./FeatureSelect.module.scss";

interface FormProps {
    step: SurgeryStep;
}

const FeatureSelect: FC<FormProps> = ({ step }) => {
    const [featureValues, setFeatureValues] = useState<StringDictionary<string>>();
    const features = useMemo(() => stepToFeatures[step], [step]);
    const [usedFeatures, setUsedFeatures] = useState<FeatureType[]>([]);

    useEffect(() => {
        const fillDictionary = (acc: StringDictionary<string>, feature: string) => {
            acc[feature] = "";
            return acc;
        };

        const emptyValues = features.reduce(fillDictionary, {} as StringDictionary<string>);

        setFeatureValues(emptyValues);
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

    const onFeatureValueChanged = (feature: FeatureType, value: string) => {
        setFeatureValues({ ...featureValues, [feature]: value });
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
                    renderInput={(params) => <TextField {...params} autoComplete="" label="Feature Name" />}
                />
            </div>
        </Box>
    )
};

export default FeatureSelect;
