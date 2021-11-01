import { Delete } from "@mui/icons-material";
import { Autocomplete, Box, TextField } from "@mui/material";
import React, { FC, useEffect, useMemo, useState } from "react";
import { featureToDetails, FeatureType } from "../../model/featureMetadata";

import styles from "./FeatureField.module.scss";

interface FeatureProps {
    feature: FeatureType;
    onValueChanged: (featureName: FeatureType, value: string) => void;
    onDelete: (featureName: FeatureType) => void;
}

const FeatureField: FC<FeatureProps> = ({ feature, onValueChanged, onDelete }) => {
    const featureDetails = featureToDetails[feature];
    const [featureValue, setFeatureValue] = useState<string>("");

    const handleFeatureValueChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        setFeatureValue(value);
    };

    const deleteFeature = () => {
        onDelete(feature);
    };

    const isValid = useMemo(() => featureDetails.validation(featureValue), [featureValue]);

    useEffect(() => {
        if (isValid)
            onValueChanged(feature, featureValue);
    }, [isValid]);

    return (
        <>
            <div className={styles.container}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <Delete onClick={deleteFeature} sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField
                        label={featureDetails.name}
                        onChange={handleFeatureValueChange}
                        color={isValid ? "success" : "error"}
                        variant="standard"
                    />
                </Box>
            </div>

        </>
    );
};

export default FeatureField;