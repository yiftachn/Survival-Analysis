import { Autocomplete, TextField } from "@mui/material";
import React, { FC, useMemo } from "react";
import stepToFeatures from "../../model/stepToFeatures";
import { SurgeryStep } from "../../model/surgeryStep";

interface FormProps {
    step: SurgeryStep;
}

const FeatureSelect: FC<FormProps> = ({ step }) => {
    const optionalFeatures = useMemo(() => stepToFeatures[step], [step]);

    return (
        <Autocomplete
            disablePortal
            options={optionalFeatures}
            renderInput={(params) => <TextField {...params} label="Feature Name" />}
        />
    )
};

export default FeatureSelect;
