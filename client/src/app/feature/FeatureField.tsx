import { Delete, Info } from "@mui/icons-material";
import { Autocomplete, Box, TextField, Tooltip } from "@mui/material";
import React, { FC, useEffect, useMemo, useState } from "react";
import { startCase } from "lodash";
import { featureToDetails, FeatureType } from "../../model/featureMetadata";
import styles from "./FeatureField.module.scss";
import useErrorValidation from "../../hooks/useErrorValidation";

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
        onValueChanged(feature, featureValue);
    };

    const deleteFeature = () => {
        onDelete(feature);
    };

    const [isValid, errorText] = useErrorValidation(featureDetails.validators, featureValue);

    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <Tooltip title={featureDetails.description} placement="top-start">
                <TextField
                    fullWidth
                    value={featureValue}
                    label={startCase(featureDetails.name)}
                    onChange={handleFeatureValueChange}
                    helperText={errorText}
                    error={!isValid}
                    variant="standard"
                />
            </Tooltip>
            <Delete onClick={deleteFeature} className={styles.deleteIcon} sx={{ ml: 1, my: isValid ? 0.5 : 3.5 }} />
        </Box>
    );
};

export default FeatureField;