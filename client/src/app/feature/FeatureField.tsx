import { Delete } from "@mui/icons-material";
import { Box, TextField, Tooltip } from "@mui/material";
import React, { FC, useEffect, useMemo, useState } from "react";
import { featureToDetails, FeatureType } from "../../model/featureMetadata";
import styles from "./FeatureField.module.scss";
import useErrorValidation from "../../hooks/useErrorValidation";
import FeatureDetails from "../../model/featureDetails";

interface FeatureProps {
    feature: FeatureDetails;
    onValueChanged: (featureName: FeatureType, value: number | undefined) => void;
    onDelete: (featureName: FeatureType) => void;
}

const FeatureField: FC<FeatureProps> = ({ feature, onValueChanged, onDelete }) => {
    const [featureValue, setFeatureValue] = useState<string>("");

    const convertToNumber = (value: string) => {
        if (value === "")
            return undefined;
        return feature.toNumber ? feature.toNumber(value) : parseFloat(value);
    }

    const handleFeatureValueChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        setFeatureValue(value);

        const valueAsNumber = convertToNumber(value);
        onValueChanged(feature.name, valueAsNumber);
    };

    const deleteFeature = () => {
        onDelete(feature.name);
    };

    const [isValid, errorText] = useErrorValidation(feature.validators, featureValue);

    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <TextField
                fullWidth
                value={featureValue}
                label={feature.displayName}
                onChange={handleFeatureValueChange}
                helperText={errorText}
                error={!isValid}
                variant="standard"
            />
            <Delete onClick={deleteFeature} className={styles.deleteIcon} sx={{ ml: 1, my: isValid ? 0.5 : 3.5 }} />
        </Box>
    );
};

export default FeatureField;