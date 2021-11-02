import { Delete } from "@mui/icons-material";
import { Box, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { FeatureType } from "../../model/featureMetadata";
import styles from "./FeatureField.module.scss";
import useErrorValidation from "../../hooks/useErrorValidation";
import FeatureDetails from "../../model/featureDetails";

interface FeatureProps {
    feature: FeatureDetails;
    onValueChanged: (featureName: FeatureType, value: number | undefined) => void;
    onValidityChanged: (featureName: FeatureType, isValid: boolean) => void;
}

const FeatureField: FC<FeatureProps> = ({ feature, onValueChanged, onValidityChanged }) => {
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

    const handleFeatureValueSelected = ({ target: { value } }: SelectChangeEvent<string>) => {
        setFeatureValue(value);

        const valueAsNumber = convertToNumber(value);
        onValueChanged(feature.name, valueAsNumber);
    };

    const [isValid, errorText] = useErrorValidation(feature.validators, featureValue);

    useEffect((): void => {
        onValidityChanged(feature.name, isValid);
    }, [feature.name, isValid]);

    return (
        <>
            {feature.choices === undefined ?
                <TextField
                    fullWidth
                    value={featureValue}
                    label={feature.displayName}
                    onChange={handleFeatureValueChange}
                    helperText={errorText}
                    error={!isValid}
                    variant="outlined"
                    color={featureValue !== "" ? "success" : undefined}
                    focused={featureValue !== ""}
                /> :
                <div>
                    <InputLabel id="demo-simple-select-label">{feature.displayName}</InputLabel>
                    <Select
                        fullWidth
                        value={featureValue}
                        onChange={handleFeatureValueSelected}
                        error={!isValid}
                        variant="outlined"
                        color={featureValue !== "" ? "success" : undefined}
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        {feature.choices.map(choice => (
                            <MenuItem key={choice} value={choice}>{choice}</MenuItem>
                        ))}
                    </Select>
                </div>
            }
        </>
    );
};

export default FeatureField;