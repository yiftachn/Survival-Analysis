import { Delete } from "@mui/icons-material";
import { Autocomplete, Box, TextField } from "@mui/material";
import React, { FC, useEffect, useMemo, useState } from "react";
import { startCase } from "lodash";
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

    const isInvalid = useMemo(() => {
        return !featureDetails.validation(featureValue);
    }, [featureValue]);

    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <TextField
                fullWidth
                value={featureValue}
                label={startCase(featureDetails.name)}
                onChange={handleFeatureValueChange}
                error={isInvalid}
                helperText={featureDetails.description}
                variant="standard"
            />
            <Delete onClick={deleteFeature} className={styles.deleteIcon} sx={{ ml: 1, my: 3 }} />
        </Box>
    );
};

export default FeatureField;