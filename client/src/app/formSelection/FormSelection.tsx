import { InputLabel, MenuItem, Select } from "@material-ui/core";
import React, { FC, useState } from "react";
import { stepToDisplayName, SurgeryStep } from "../../model/surgeryStep";
import styles from "./FormSelection.module.scss";

const FormSelection: FC = () => {
    const [step, setStep] = useState<SurgeryStep>("preparation");

    const handleStepSelection = (event: React.ChangeEvent<{ value: unknown }>) => {
        setStep(event.target.value as SurgeryStep);
    };

    return (
        <div className={styles.container}>
            <InputLabel>Surgery Step</InputLabel>
            <Select value={step} label="Step" onChange={handleStepSelection}>
                {Object.keys(stepToDisplayName).map((stepName: string) => (
                    <MenuItem key={stepName} value={stepName}>
                        {stepToDisplayName[stepName as SurgeryStep]}
                    </MenuItem>
                ))}
            </Select>
        </div>
    );
};

export default FormSelection;
