import { Delete } from "@mui/icons-material";
import { Box, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { FeatureType } from "../../model/featureMetadata";
import styles from "./FeatureField.module.scss";
import useErrorValidation from "../../hooks/useErrorValidation";
import FeatureDetails from "../../model/featureDetails";

interface FeatureProps {
    feature: FeatureDetails;
    featureValue: string;
    setFeatureValue: (featureName: FeatureType, value: string) => void;
    onValidityChanged: (featureName: FeatureType, isValid: boolean) => void;
}

const FeatureField: FC<FeatureProps> = ({ feature, featureValue, setFeatureValue, onValidityChanged }) => {
    const handleFeatureValueChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        const nullableValue = value === "" ? undefined : value;
        setFeatureValue(feature.name, nullableValue);
    };

    const handleFeatureValueSelected = ({ target: { value } }: SelectChangeEvent<string>) => {
        const nullableValue = value === "" ? undefined : value;
        setFeatureValue(feature.name, nullableValue);
    };

    const [isValid, errorText] = useErrorValidation(feature.validators, featureValue);

    useEffect((): void => {
        onValidityChanged(feature.name, isValid);
    }, [feature.name, isValid]);

    return (
        <>
            <InputLabel>{feature.displayName}</InputLabel>
            {feature.choices === undefined ?
                <TextField
                    fullWidth
                    value={featureValue}
                    onChange={handleFeatureValueChange}
                    helperText={errorText}
                    error={!isValid}
                    variant="outlined"
                    color={featureValue !== "" ? "success" : undefined}
                    focused={featureValue !== ""}
                /> :
                <Select
                    sx={{ color: "success" }}
                    fullWidth
                    value={featureValue}
                    onChange={handleFeatureValueSelected}
                    error={!isValid}
                    variant="outlined"
                    color={featureValue !== "" ? "success" : undefined}
                    className={featureValue !== "" ? styles.selectSuccess : undefined}
                >
                    <MenuItem value=""><em>None</em></MenuItem>
                    {feature.choices.map(choice => (
                        <MenuItem key={choice} value={choice}>{choice}</MenuItem>
                    ))}
                </Select>
            }
        </>
    );
};

export default FeatureField;