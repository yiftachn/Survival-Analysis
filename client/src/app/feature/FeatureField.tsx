import { InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
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
        if (feature.toNumber)
            return feature.toNumber(value);

        if (feature.choices)
            return feature.choices.findIndex(_ => _ === value);

        return parseFloat(value);
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