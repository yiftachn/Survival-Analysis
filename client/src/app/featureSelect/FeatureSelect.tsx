import { Autocomplete, TextField } from "@mui/material";
import React, { FC, useMemo, useState } from "react";
import StringDictionary from "../../common/stringDictionary";
import { FeatureType, featureToDetails } from "../../model/featureMetadata";
import stepToFeatures from "../../model/stepToFeatures";
import { SurgeryStep } from "../../model/surgeryStep";
import FeatureField from "../feature/FeatureField";

interface FormProps {
    step: SurgeryStep;
}

const FeatureSelect: FC<FormProps> = ({ step }) => {
    const [featureValues, setFeatureValues] = useState<StringDictionary<string>>();
    const features = useMemo(() => stepToFeatures[step], [step]);
    const [usedFeatures, setUsedFeatures] = useState<FeatureType[]>([]);

    const avaliableFeatures = useMemo(() => features.filter(_ => !usedFeatures.includes(_)), [
        features,
        usedFeatures
    ]);

    const onAutoselectSelected = (event: React.SyntheticEvent<Element, Event>, value: string | null) => {
        if (value) {
            setUsedFeatures([...usedFeatures, value as FeatureType]);
        }
    };

    const handleRemove = (feature: FeatureType) => {
        setUsedFeatures(usedFeatures.filter(f => f === feature));
    };

    const onFeatureValueChanged = (feature: FeatureType, value: string) => {
        setFeatureValues({ ...featureValues, [feature]: value });
    };

    return (
        <>
            {usedFeatures.map((feature: FeatureType) =>
                <FeatureField key={feature} feature={feature} onValueChanged={onFeatureValueChanged} onDelete={handleRemove} />
            )}

            <Autocomplete
                disablePortal
                options={avaliableFeatures}
                onChange={onAutoselectSelected}
                renderInput={(params) => <TextField {...params} label="Feature Name" />}
            />
        </>
    )
};

export default FeatureSelect;
