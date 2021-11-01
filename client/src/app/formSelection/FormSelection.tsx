import { InputLabel, TextField, ButtonGroup, Button } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { stepToDisplayName, SurgeryStep } from "../../model/surgeryStep";
import styles from "./FormSelection.module.scss";

interface FormSelectionProps {
    onStepSelected: (step: SurgeryStep) => void;
}

const FormSelection: FC<FormSelectionProps> = ({ onStepSelected }) => {
    const [step, setStep] = useState<SurgeryStep>();
    const [patientId, setPatientId] = useState<string>("");

    useEffect(() => {
        if (step !== undefined) {
            onStepSelected(step);
        }
    }, [step]);

    const onPatientIdChanged = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        setPatientId(value);
    };

    return (
        <div className={styles.container}>
            <TextField value={patientId} onChange={onPatientIdChanged} label="Patient ID" fullWidth required color="primary" variant="filled"
            />
            <InputLabel>Surgery Step</InputLabel>
            <ButtonGroup fullWidth>
                {Object.keys(stepToDisplayName).map((stepName: string) => (
                    <Button
                        key={stepName}
                        value={stepName}
                        onClick={() => setStep(stepName as SurgeryStep)}
                        variant={step === stepName ? "contained" : "outlined"}
                        color="primary"
                    >
                        {stepToDisplayName[stepName as SurgeryStep]}
                    </Button>
                ))}
            </ButtonGroup>
        </div>
    );
};

export default FormSelection;
